const middleWare = (req, res, next) => {
  console.log('Hello from middleware');
  next();
};

module.exports = middleWare;
