const express = require('express');

const peopleDB = require('../db/peopleDB');

const router = express.Router();

router.get('/', async (_req, res) => {
  try{
    const [ result ] = await peopleDB.findAll();
    res.status(200).json(result);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const idParams = req.params.id;
    const [[ result ]] = await peopleDB.findById(idParams);
    if(result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  }catch(error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage });
  }
})

router.post('/', async (req, res) => {
  const person = req.body;
  try{
    const [ result ] = await peopleDB.insert(person); 
    res.status(201).json({
      message: `Pessoa cadastrada com sucesso com o id ${result.insertId}`
    })
  } catch(error){
    console.log(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' })
  }
});

router.put('/:id', async (req, res) => {
  try{ 
    const idParams = req.params.id;
    const person = req.body;
    const [ result ] = await peopleDB.update(idParams, person);
    if(result.changedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${idParams} atualizada com sucesso`}) 
    } else {
      res.status(400).json({ message: 'Não foi possível atualizar a pessoa' })
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idParams = req.params.id;
    const [ result ] = await peopleDB.remove(idParams);
    if(result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${idParams} excluída com sucesso`});
    }  else {
      res.status(404).json({ message: 'Pessoa não encontrada' })
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: error.sqlMessage });
  }
  
})

module.exports = router;
