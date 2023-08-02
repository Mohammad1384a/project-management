const { Router } = require("express");
const { upload } = require("../modules/multer");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const { createProjectValidator } = require("../http/validation/project");
const { validationMapper } = require("../http/middlewares/checkErrors");
const ProjectController = require("../http/controllers/project.controller");
const router = Router();

router.post(
  "/create",
  isUserLogedIn,
  upload.single("projectImage"),
  createProjectValidator(),
  validationMapper,
  ProjectController.createProject
);

module.exports = router;
