const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().sort({data: 1}).toArray();

  return tasks;
}

module.exports = { getAll };
