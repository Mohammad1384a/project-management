const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashPassword(pass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

function comparePassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

function genToken(payload) {
  return jwt.sign({ payload }, process.env.SECRET_KEY, {
    expiresIn: "2d",
    algorithm: "HS256",
  });
}

module.exports = {
  hashPassword,
  genToken,
  comparePassword,
};
