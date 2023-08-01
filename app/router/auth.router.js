const { Router } = require("express");
const AuthController = require("../http/controllers/auth.controller");
const {
  registerValidator,
  loginValidation,
} = require("../http/validation/auth");
const { validationMapper } = require("../http/middlewares/checkErrors");
const { upload } = require("../modules/multer");
const router = Router();

router.post(
  "/register",
  registerValidator(),
  upload.single("profileImage"),
  validationMapper,
  AuthController.register
);

router.post("/login", loginValidation(), AuthController.login);

module.exports = {
  authRouter: router,
};
