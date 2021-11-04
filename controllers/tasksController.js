const rescue = require('express-rescue');
const moment = require('moment'); 
const { getAll, create } = require('../models/tasksModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

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


module.exports = { getAllTasks, createTask };
