const { teamModel } = require("../../models/team");
const { userModel } = require("../../models/user");

async function findTeam(req, res, next) {
  try {
    const { id } = req.params;
    const team = await teamModel.findOne({ _id: id });
    if (!team)
      throw {
        status: 400,
        message: "not found team",
      };
    return team;
  } catch (error) {
    next(error);
  }
}
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
      const team = await findTeam(req, res, next);
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
      await findTeam(req, res, next);
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
  async inviteUser(req, res, next) {
    try {
      const userId = req.user._id;
      const invitedUser = req.params.username;
      const teamId = req.params.id;
      const teamExists = await findTeam(req, res, next);
      if (!teamExists.owner.equals(userId))
        throw {
          status: 400,
          message: "you are not the owner of this team",
        };
      const user = await userModel.findOne({ username: invitedUser });
      if (!user)
        throw {
          status: 400,
          message: "the user you have invited does not exist",
        };
      const request = {
        invitor: userId,
        requestDate: new Date(),
        status: "pending",
        teamId,
      };
      const requestExists = user.inviteRequests.filter(
        (invitation) => invitation.teamId !== teamId
      );
      if (requestExists.length > 0)
        throw {
          status: 500,
          message: "this request already exists",
        };
      const sendRequest = await userModel.updateOne(
        { username: invitedUser },
        {
          $push: {
            inviteRequests: request,
          },
        }
      );
      if (sendRequest.modifiedCount == 0) {
        throw {
          status: 500,
          message: "sending request failed",
        };
      }
      return res.status(200).json({
        status: 200,
        sendRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  updateTeam() {}
  removeUserFromTeam() {}
}

module.exports = new TeamController();
