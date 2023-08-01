const { Router } = require("express");
const UserController = require("../http/controllers/user.controller");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const { validationMapper } = require("../http/middlewares/checkErrors");
const { upload } = require("../modules/multer");
const { imageValidator } = require("../http/validation/user");
const router = Router();

router.get("/profile", isUserLogedIn, UserController.getProfile);
router.post("/update-profile", isUserLogedIn, UserController.editProfile);
router.post(
  "/upload-image",
  isUserLogedIn,
  upload.single("profileImage"),
  imageValidator(),
  validationMapper,
  UserController.uploadImage
);

module.exports = router;
