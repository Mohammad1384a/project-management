const { Router } = require("express");
const UserController = require("../http/controllers/user.controller");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const router = Router();

router.get("/profile", isUserLogedIn, UserController.getProfile);

module.exports = router;
