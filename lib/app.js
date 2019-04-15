const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');
const trollRoutes = require('./routes/trolls');

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);
app.use('./trolls', trollRoutes);


module.exports = app;


