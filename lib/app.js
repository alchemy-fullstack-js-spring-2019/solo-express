const express = require('express');
const app = express();

app.get('', (req, res) => {
  console.log(req);
  res.send('Hi');
});

module.exports = app;
