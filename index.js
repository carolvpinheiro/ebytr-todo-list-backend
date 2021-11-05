const express = require('express');
const bodyParse = require('body-parser');
require('dotenv').config(); 

const { getAllTasks, createTask, excludeTask } = require('./controllers/tasksController');

const app = express();
app.use(bodyParse.json());

const PORT = process.env.PORT || 3001;

// app.get('/', getAllTasks);
app.get('/', (req, res) => {
  res.send('Bom dia meu povo!')
})
app.post('/', createTask);
app.delete('/:id', excludeTask);

app.listen(PORT, () => {
  console.log(`Escutada na porta ${PORT}`);
});
