const express = require('express');
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');
const app = express();

app.use(express.json());

app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

module.exports = app;
