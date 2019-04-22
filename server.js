const express = require('express');
const app = require('./lib/app');

app.listen(3000, () => {
  console.log('started on port 3000');
});
