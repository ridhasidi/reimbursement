const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payLoad) {
  return jwt.sign(payLoad, SECRET_KEY);
}

function convertToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  convertToken,
};
