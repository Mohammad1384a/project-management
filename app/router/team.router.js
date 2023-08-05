const { Router } = require("express");
const router = Router();
const { isUserLogedIn } = require("../http/middlewares/isUserLogedIn");
const { validationMapper } = require("../http/middlewares/checkErrors");
const teamController = require("../http/controllers/team.controller");
const { createTeamValidator } = require("../http/validation/team");

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

module.exports = router;
