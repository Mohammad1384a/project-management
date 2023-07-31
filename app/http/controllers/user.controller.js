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
  editProfile() {}
  addSkills() {}
  editSkills() {}
  acceptInvitation() {}
  rejectInvitation() {}
}

module.exports = new UserController();
