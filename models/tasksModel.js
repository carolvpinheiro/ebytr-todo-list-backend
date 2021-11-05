const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().sort({data: 1}).toArray();

  return tasks;
};

const create = async (data, task, status) => {
  const db = await connection();
  const product = await db.collection('tasks').insertOne({ data, task, status });

  return { _id: product.insertedId, data, task, status };
};

const exclude = async (id) => {
  const validId = ObjectId.isValid(id);
  if (!validId) return null;

  const db = await connection();
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  
  return id;
};

module.exports = { getAll, create, exclude };
