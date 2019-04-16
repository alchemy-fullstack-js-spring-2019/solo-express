const express = require('express');
const tweetsRoutes = require('./routes/tweets');
// const tagsRoutes = require('./routes/')
const app = express();

// app.use(require('./middleware/logger'));

app.use(express.json());
app.use('/tweets', tweetsRoutes);
// app.use('/tags', tagsRoutes);

module.exports = app;
