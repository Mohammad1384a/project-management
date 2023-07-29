const { validationResult } = require("express-validator");
const { userModel } = require("../../models/user");
const { hashPassword } = require("../../modules/functions");
class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash = hashPassword(password);
      const user = await userModel.create({
        username,
        email,
        mobile,
        password: hash,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
  login() {}
}

module.exports = new AuthController();
