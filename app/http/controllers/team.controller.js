const { teamModel } = require("../../models/team");
class TeamController {
  async createTeam(req, res, next) {
    try {
      const { name, description, users, owner, projects } = req.body;
      const team = await teamModel.create({
        name,
        projects,
        description,
        users,
        owner,
      });
      if (!team)
        throw {
          status: 400,
          message: "creating team failed",
        };
      return res.status(200).json({
        status: 200,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamsList(req, res, next) {
    try {
      const teams = await teamModel.find({});
      if (!teams)
        throw {
          status: 400,
          message: "no teams found",
        };
      return res.status(200).json({
        status: 200,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const _id = req.params.id;
      const team = await teamModel.find({ _id });
      if (!team)
        throw {
          status: 400,
          message: "not found team",
        };
      return res.status(200).json({
        status: 200,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeamById(req, res, next) {
    try {
      const owner = req.user._id;
      const _id = req.params.id;
      const team = await teamModel.findOne({ _id, owner });
      if (!team)
        throw {
          status: 404,
          message: "not found team",
        };
      const removeTeam = await teamModel.deleteOne({ _id, owner });
      if (removeTeam.deletedCount == 0)
        throw {
          status: 500,
          message: "removing team failed",
        };
      return res.status(200).json({
        status: 200,
        removeTeam,
      });
    } catch (error) {
      next(error);
    }
  }
  inviteUser() {}
  updateTeam() {}
  removeUserFromTeam() {}
}

module.exports = new TeamController();
