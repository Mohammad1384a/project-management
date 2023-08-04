const { Router } = require("express");
const { upload } = require("../modules/multer");
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const {
  ProjectValidator,
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
  ProjectValidator(),
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

router.put(
  "/edit/:id",
  isUserLogedIn,
  mongoIdValidator(),
  upload.single("projectImage"),
  ProjectValidator(),
  validationMapper,
  projectController.updateProject
);

module.exports = router;
