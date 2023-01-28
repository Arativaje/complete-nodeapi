
exports.myAuth = (req, res, next) => {
  console.log("This is my auth middleware calling");
  return next();
};
