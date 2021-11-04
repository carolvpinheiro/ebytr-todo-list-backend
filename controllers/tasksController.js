const rescue = require('express-rescue');
const { getAll } = require('../models/tasksModel');

const getAllTasks = rescue(async (_req, res) => {
  const tasks = await getAll();

  res.status(200).json(tasks);
});

module.exports = { getAllTasks };
