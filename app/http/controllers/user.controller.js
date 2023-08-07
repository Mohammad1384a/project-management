const { userModel } = require("../../models/user");

async function getUser(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await userModel.findOne({ _id: userId });
    if (!user)
      throw {
        status: 400,
        message: "not found user",
      };
    return user;
  } catch (error) {
    next(error);
  }
}
class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      const imageAddress =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        user.profileImage.replace(/[\\\\]/gm, "/");
      user.profileImage = imageAddress;
      if (!user) throw "Please login first";
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = req.body;
      const userId = req.user._id;
      const fields = ["first_name", "last_name"];
      const badValues = ["", " ", undefined, null];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value?.trim())) delete data[key];
      });
      const newUser = await userModel.updateOne(
        { _id: userId },
        { $set: data }
      );
      if (newUser.modifiedCount == 0) {
        throw {
          status: 400,
          message: "updatin user failed",
        };
      }
      return res.status(200).json({
        status: 200,
        message: "User updated successfully",
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadImage(req, res, next) {
    try {
      const userId = req.user._id;
      const filePath = req.file?.path.substring(7);
      const result = await userModel.updateOne(
        { _id: userId },
        { $set: { profileImage: filePath } }
      );
      if (result.modifiedCount == 0) {
        throw { status: 400, message: "failed to add profile image" };
      }
      return res.status(200).json({
        status: 200,
        message: "image added successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequests(req, res, next) {
    try {
      const requests = await getUser(req, res, next);
      if (requests.inviteRequests.lenght === 0) {
        throw {
          status: 400,
          message: "you have got no request",
        };
      }
      return res.status(200).json({
        status: 200,
        requests: requests.inviteRequests,
      });
    } catch (error) {
      next(error);
    }
  }
  async getSpecificRquest(req, res, next) {
    try {
      const status = req.params.status;
      const user = await getUser(req, res, next);
      const specific = user.inviteRequests.filter((r) => r.status === status);
      if (specific.length === 0) {
        throw {
          status: 400,
          message: "no request found in this type",
        };
      }
      return res.status(200).json({
        status: 200,
        specific,
      });
    } catch (error) {
      next(error);
    }
  }
  async changeInvitationStatus(req, res, next) {
    try {
      const { id, status } = req.params;
      const user = await getUser(req, res, next);
      const findRequest = user.inviteRequests.find((r) => r._id.equals(id));
      if (!findRequest)
        throw {
          status: 404,
          message: "not found request",
        };
      if (findRequest.status !== "pending")
        throw {
          status: 400,
          message: "request was already accepted or rejected",
        };
      const validStatus = ["accepted", "rejected"];
      if (!validStatus.includes(status))
        throw {
          status: 500,
          message: "invalid status",
        };
      const updateRequest = await userModel.updateOne(
        { "inviteRequests._id": id },
        {
          $set: { "inviteRequests.$.status": status },
        }
      );
      if (updateRequest.modifiedCount === 0)
        throw {
          status: 500,
          message: "updating request failed",
        };
      return res.status(200).json({
        status: 200,
        updateRequest,
      });
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
}

module.exports = new UserController();
