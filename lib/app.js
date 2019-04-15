const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());
//if http://localhost:7890/tweets, use tweetsRoutes
app.use('/tweets', tweetsRoutes);

// GET
// app.get('/hello', (req, res) => {
//     //res.send for json, res.end for text
//     res.send({ name: 'bonnie' });
// });

// app.post('/hello', (req, res) => {
    
// });

module.exports = app;
