const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.end('hi');
});

app.post('/hello', (req, res) => {

});

module.exports = app;
