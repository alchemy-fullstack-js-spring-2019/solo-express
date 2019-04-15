const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send({name: 'Mal' });
});

module.exports = app;
