const { Router } = require("express");
const UserController = require("../http/controllers/user.controller");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const userController = require("../http/controllers/user.controller");
const router = Router();

router.get("/profile", isUserLogedIn, UserController.getProfile);
router.post("/update-profile", isUserLogedIn, userController.editProfile);

module.exports = router;
