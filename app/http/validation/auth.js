const { body } = require("express-validator");
const { userModel } = require("../../models/user");

function registerValidator(req, res, next) {
  return [
    body("username").custom(async (value) => {
      if (value) {
        const userRegex = /^[a-z]+[a-z0-9\_\.\-]{2,}/;
        if (userRegex.test(value)) {
          const userExists = await userModel.findOne({ value });
          if (userExists) throw "username already exists";
          return true;
        }
        throw "username must include at least two characters, start with an alphabet and can contain (_.-) characters";
      }
      throw "Username cannot be empty";
    }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (email) => {
        if (email) {
          const userExists = await userModel.findOne({ email });
          if (userExists) throw "email already exists";
          return true;
        } else {
          throw "Email is required";
        }
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("Please enter a valid phone number")
      .custom(async (mobile) => {
        if (mobile) {
          const userExists = await userModel.findOne({ mobile });
          if (userExists) throw "mobile already exists";
          return true;
        } else {
          throw "Mobile phone is required";
        }
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password must contain 6-16 characters")
      .custom((value, { req }) => {
        if (!value) {
          // throw "Password cannot be empty";
          res.status(400).json({
            status: 400,
            message: "password cannot be empty",
          });
        }
        if (value !== req?.body?.confirm_password) {
          // throw "Password must be confirmed";
          res.status(400).json({
            status: 400,
            message: "Password must be confirmed",
          });
        }
        return true;
      }),
  ];
}

module.exports = {
  registerValidator,
};
