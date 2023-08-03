const { Router } = require("express");
const { upload } = require("../modules/multer");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const {
  createProjectValidator,
  mongoIdValidator,
} = require("../http/validation/project");
const { validationMapper } = require("../http/middlewares/checkErrors");
const ProjectController = require("../http/controllers/project.controller");
const projectController = require("../http/controllers/project.controller");
const router = Router();

router.post(
  "/create",
  isUserLogedIn,
  upload.single("projectImage"),
  createProjectValidator(),
  validationMapper,
  ProjectController.createProject
);

router.get(
  "/get",
  isUserLogedIn,
  validationMapper,
  ProjectController.getAllProjects
);

router.get(
  "/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  ProjectController.getProjectById
);

router.delete(
  "/remove/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  projectController.removeProjectById
);

router.get(
  "/user/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  projectController.getProjectsOfUser
);

router.get;

module.exports = router;
