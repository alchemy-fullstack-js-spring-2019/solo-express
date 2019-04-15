const express = require('express');
const app = express();

// GET
app.get('/hello', (req, res) => {
    res.send({ name: 'bonnie' });
});

app.post('/hello', (req, res) => {
    
});

module.exports = app;
