const express = require('express');
const bodyParse = require('body-parser');
require('dotenv').config(); 

const { getAllTasks, createTask, excludeTask } = require('./controllers/tasksController');

const app = express();
app.use(bodyParse.json());

const URL_PORT = process.env.PORT || 3001;

app.get('/', getAllTasks);
app.post('/', createTask);
app.delete('/:id', excludeTask);

app.listen(URL_PORT, () => {
  console.log(`Escutada na porta ${URL_PORT}`);
});
