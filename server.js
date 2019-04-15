const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.end('hi');
});

app.toString('/hello', (req, res) => {
  
});

app.listen(7890, () => {
  console.log('Started on port 7890');
});
