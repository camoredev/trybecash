require('dotenv').config();
const app = require('./app');
const connection = require('./db/connection');

const PORT = 3001;

app.listen(process.env.PORT || PORT, async () => {console.log(`Server running on port ${PORT}`)
// testa a conexão com o banco de dados
const [result] = await connection.execute('SELECT 1');
if(result) {
  console.log('mysql connected');
}

});