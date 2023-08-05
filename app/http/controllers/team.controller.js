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
  inviteUser() {}
  removeTeamById() {}
  updateTeam() {}
  removeUserFromTeam() {}
}

module.exports = new TeamController();
