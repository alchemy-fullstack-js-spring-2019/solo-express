const express = require('express');
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');
const app = express();

app.use('./middleware/logger.js');

app.use(express.json());

app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

/*eslint-disable-next-line no-unused-vars*/
app.use((err, req, res, next) => {
  req.statusCode(500).send({ error: err });
});

module.exports = app;
