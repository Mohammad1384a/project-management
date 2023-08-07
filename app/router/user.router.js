const { Router } = require("express");
const { mongoIdValidator } = require("../http/validation/project");
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

router.get(
  "/requests",
  isUserLogedIn,
  validationMapper,
  UserController.getRequests
);

router.get(
  "/requests/:status",
  isUserLogedIn,
  validationMapper,
  UserController.getSpecificRquest
);

router.post(
  "/requests/:status/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  UserController.changeInvitationStatus
);

module.exports = router;
