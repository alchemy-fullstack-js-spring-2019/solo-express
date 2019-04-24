const express = require('express');
const app = express();
const tagsRoutes = require('./routes/tags');

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.json());

app.use('/tags', tagsRoutes);

app.use(require('./middleware/not-found'));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
  next();
});

module.exports = app;
