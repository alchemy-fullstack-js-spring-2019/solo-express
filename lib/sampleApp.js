const express = require('express');

const app = express();




// GET - takes a path, request handler
app.get('/hello', (req, res) => {
    //this sets the header to content-type json
    res.send({ name: 'ryan' });
    //res.send or res.json for JSON
    //res.end for strings/text
});

module.exports = app;

