const app = require('./lib/app.js');

app.listen(3355, () => {
  console.log('client connected to the server');
});
