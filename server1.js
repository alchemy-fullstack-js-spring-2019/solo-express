const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.end('yo');
});

app.listen(8888);

