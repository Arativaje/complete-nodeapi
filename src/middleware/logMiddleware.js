
exports.logRequest = (req, res, next) => {
    console.log("Incoming Request path : "+ req.path +" with Payload "+ JSON.stringify(req.body)+" Type : "+req.method);
    return next();
  };
  