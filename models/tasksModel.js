const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().sort({data: 1}).toArray();

  return tasks;
}

const create = async (data, task, status) => {
  const db = await connection();
  const product = await db.collection('tasks').insertOne({ data, task, status });

  return { _id: product.insertedId, data, task, status };
};

module.exports = { getAll, create };
