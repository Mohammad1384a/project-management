const { Router } = require("express");
const router = Router();
const projectRouter = require("./project.router");
const authRouter = require("./auth.router");
const teamRouter = require("./team.router");
const userRouter = require("./user.router");

router.use("/auth", authRouter);
router.use("/project", projectRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);

module.exports = {
  AllRoutes: router,
};
