const connection = require('./connection');

const findAll = () => connection.execute('SELECT * FROM people');

const findById = (id) => connection.execute('SELECT * FROM people WHERE id=?', [id]);  

const insert = (person) => connection.execute(
  'INSERT INTO people (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
  [person.firstName, person.lastName, person.email, person.phone], 
);

const update = (id, person) => connection.execute (
  'UPDATE people SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?',
  [person.firstName, person.lastName, person.email, person.phone, id],
);

const remove = (id) => connection.execute(
  'DELETE FROM people WHERE id = ?', [id],
);

module.exports = {
  insert,
  findAll,
  findById,
  update,
  remove,
}