const express = require('express');
const app = express();

app.listen(7890, ()=> {
    console.log('server started on port 7890');
});
