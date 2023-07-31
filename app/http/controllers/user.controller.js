const { userModel } = require("../../models/user");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      if (!user) throw "Please login first";
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = req.body;
      const { first_name, last_name } = req.body;
      console.log(first_name, last_name);
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
      console.log(newUser);
      if (newUser.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          message: "User updated successfully",
          newUser,
        });
      }
      throw {
        status: 400,
        message: "updatin user failed",
      };
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInvitation() {}
  rejectInvitation() {}
}

module.exports = new UserController();
