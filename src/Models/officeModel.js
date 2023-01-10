const { connection } = require('./connection');

const getById = async (id) => {
  const query = 'SELECT * FROM exercises.offices WHERE id = ?';
  const [office] = await connection.execute(query, [id]);
  return office[0];
}

module.exports = {
  getById,
};
