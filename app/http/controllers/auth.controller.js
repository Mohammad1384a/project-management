const { userModel } = require("../../models/user");
const {
  hashPassword,
  comparePassword,
  genToken,
} = require("../../modules/functions");
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
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (!user)
        return res.status(400).json({
          status: 400,
          message: "username or password is invalid",
        });
      const isPasswordValid = comparePassword(password, user?.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: 400,
          message: "username or password is invalid",
        });
      }
      const token = genToken(username);
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: 200,
        message: "login successful",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
