const { Router } = require("express");
const AuthController = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validation/auth");
const { validationMapper } = require("../http/middlewares/checkErrors");
const router = Router();

router.post(
  "/register",
  registerValidator(),
  validationMapper,
  AuthController.register
);

module.exports = {
  authRouter: router,
};
