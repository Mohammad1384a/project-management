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
    expiresIn: "30d",
    algorithm: "HS256",
  });
}

function verifyToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY, {
    algorithms: "HS256",
  });
  if (!result)
    throw {
      status: 400,
      message: "token error from functions",
    };
  return result;
}

module.exports = {
  hashPassword,
  genToken,
  comparePassword,
  verifyToken,
};
