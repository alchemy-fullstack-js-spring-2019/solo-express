const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

// app.get('/hello', (req, res) => {
//   res.end('hi');
// });

app.use(express.json());
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

module.exports = app;
