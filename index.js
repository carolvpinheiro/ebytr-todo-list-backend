const express = require('express');
require('dotenv').config(); 

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Escutada na porta ${PORT}`);
});
