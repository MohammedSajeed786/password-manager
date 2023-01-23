var jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  //removing token from header
  let token = req.header("auth-token");
  //token not found in header
  if (!token) {
    res.status(401).send({ error: "access token not found" });
  }
  //token found in header
  try {
    var jwt_secret = "iamagoodboy";

    var decoded = jwt.verify(token, jwt_secret);
    req.user = decoded.user;
  } catch (err) {
    res.status(401).send({ error: "invalid access token" });
  }
  next();
};
module.exports = fetchuser;

