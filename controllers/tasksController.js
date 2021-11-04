const rescue = require('express-rescue');
const moment = require('moment'); 
const { getAll, create, exclude } = require('../models/tasksModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;

const getAllTasks = rescue(async (_req, res) => {
  const tasks = await getAll();

  res.status(HTTP_OK_STATUS).json(tasks);
});

const createTask = rescue(async (req, res) => {
  const { task, status } = req.body;
  const data = moment().format('DD-MM-yyyy');
  
  const newTask = await create(data, task, status);

  res.status(HTTP_CREATED_STATUS).json(newTask);
})

const excludeTask = rescue(async (req, res) => {
  const { id } = req.params;
  // const { task, status } = req.body;
  const excludeId = await exclude(id);

  if (excludeId === null) return res.status(UNPROCESSABLE_ENTITY).json({ message: 'Deu Ruim' });
  
  res.status(HTTP_OK_STATUS).json({ _id: id });
});

module.exports = { getAllTasks, createTask, excludeTask };
