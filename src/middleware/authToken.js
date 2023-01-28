const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

    
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Please pass token with proper header key");
  }
  try {
    const decoded = jwt.verify(token, "sandip");
    req.decoded = decoded;
  } catch (err) {
    return res.status(401).send({msg:"Invalid Token, Please use valid token",err});
  }
  return next();
};

module.exports = verifyToken;