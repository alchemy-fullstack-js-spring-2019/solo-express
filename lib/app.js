const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

module.exports = app;
