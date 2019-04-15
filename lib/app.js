const express = require('express');
const app = express();

app.get('/tweet', (req, res) => {
  res.end('heyyyy');
});

module.exports = app;
