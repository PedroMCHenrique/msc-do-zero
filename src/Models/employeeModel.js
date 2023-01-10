const { connection } = require('./connection');

const create = async ({ firstName, lastName, office }) => {
  const query = 'INSERT INTO exercises.employees (first_name, last_name, office) VALUES(?, ?, ?)';
  const [result] = await connection.execute(query, [firstName, lastName, office]);
  return result.insertId;
};

const getAll = async () => {
  const query = 'SELECT * FROM exercises.employees';
  const [employees] = await connection.execute(query);
  return employees;
}

const getById = async (id) => {
  const query = 'SELECT * FROM exercises.employees WHERE id = ?';
  const [employees] = await connection.execute(query, [id]);
  return employees[0];
}

module.exports = {
  create,
  getAll,
  getById,
};