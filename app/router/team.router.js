const { Router } = require("express");
const router = Router();
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const { validationMapper } = require("../http/middlewares/checkErrors");
const teamController = require("../http/controllers/team.controller");
const { createTeamValidator } = require("../http/validation/team");
const { mongoIdValidator } = require("../http/validation/project");

router.post(
  "/create",
  isUserLogedIn,
  createTeamValidator(),
  validationMapper,
  teamController.createTeam
);

router.get(
  "/list",
  isUserLogedIn,
  validationMapper,
  teamController.getTeamsList
);

router.get(
  "/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  teamController.getTeamById
);

router.delete(
  "/remove/:id",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  teamController.removeTeamById
);

router.post(
  "/:id/:username",
  isUserLogedIn,
  mongoIdValidator(),
  validationMapper,
  teamController.inviteUser
);

module.exports = router;
