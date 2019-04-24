//eslint-disable-next-line
module.exports = (err, req, res, next) => {
  res.status(404);
  res.send({ error: 'Not Found' });
};
