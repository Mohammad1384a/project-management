const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

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

function createPath() {
  let date = new Date();
  const Year = date.getFullYear();
  const Month = date.getMonth();
  const Day = date.getDate();
  const uploadPath = path.join(
    __dirname,
    `../../public/uploads/${Year}/${Month}/${Day}`
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "uploads", `${Year}`, `${Month}`, `${Day}`);
}

module.exports = {
  hashPassword,
  createPath,
  genToken,
  comparePassword,
  verifyToken,
};
