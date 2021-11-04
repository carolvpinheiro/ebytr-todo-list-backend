const express = require('express');
require('dotenv').config(); 

const { getAllTasks } = require('./controllers/tasksController');

const app = express();
const URL_PORT = process.env.PORT || 3001;

app.get('/', getAllTasks);

app.listen(URL_PORT, () => {
  console.log(`Escutada na porta ${URL_PORT}`);
});
