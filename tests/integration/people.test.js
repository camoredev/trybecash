const chai = require('chai'); 
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect, use } = chai;

const app = require('../../src/app');
const connection = require('../../src/db/connection');

use(chaiHttp);
const peopleList = [
  {
    id: 1,
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke.skywalker@trybe.com',
    phone: '851 678 4453',
  },

  {
    id: 2,
    firstName: 'Dart',
    lastName: 'Vader',
    email: 'dart.vader@trybe.com',
    phone: '851 678 5665',
  },
];

describe('Testando a API Trybe Cash', () => {
  describe('Usando método POST no endpoints em /people', () => {
    it('Cria cadastro de uma pessoa', async () => {
      sinon.stub(connection, 'execute').resolves([{insertId: 42}]);
      const response = await chai 
        .request(app)
        .post('/people')
        .send(
          {
          firstName: 'Luke',
          lastName: 'Skywalker',
          email: 'luke.skywalker@trybe.com',
          phone: '851 678 4453',
          },
        );
  
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ message: 'Pessoa cadastrada com sucesso com o id 42' });
    });
    afterEach(sinon.restore);
  });

  describe('Usando método GET no endpoints em /people', () => { 
    it('Retorna a lista completa de personagens!', async () => {
      sinon.stub(connection, 'execute').resolves([peopleList]);
      const response = await chai
      .request(app)
      .get('/people');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(peopleList);
    });

    it('Retorna um personagem de ID específico', async () => {
      sinon.stub(connection, 'execute').resolves([[peopleList[0]]]);

      const response = await chai 
        .request(app)
        .get('/people/1');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(peopleList[0]);
    });

    afterEach(sinon.restore);
  });

  describe('Usando método PUT no endpoints em /people', () => { 
    it('Atualiza personagem de ID = 1', async () => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const response = await chai
      .request(app)
      .put('/people/1')
      .send({
        firstName: 'Lucão',
        lastName: 'Andarilho dos céus',
        email: 'lucao.andarilho@trybe.com',
        phone: '851 678 4453',
      })

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Pessoa de id 1 atualizada com sucesso' });
    });

    it('Exclui um personagem de ID = 1', async () => {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const response = await chai 
        .request(app)
        .delete('/people/1');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ message: 'Pessoa de id 1 excluída com sucesso' });
    });

    afterEach(sinon.restore);
  });
});