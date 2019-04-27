module.exports = (req, res, next) {
  const start = Date.now();
  res.once('finish', () => {
    const end = Date.now();
    console.log(`${req.method} ${req.path} [${res.statusCode}] - ${end - start}ms`);
  });
  next();
};
