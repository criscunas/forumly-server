require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_S = 'password';

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, JWT_S, (err, decoded) => {
    if (err) {
      return res.status(400).send("invalid auth token");
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
