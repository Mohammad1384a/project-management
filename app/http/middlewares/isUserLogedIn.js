const { userModel } = require("../../models/user");
const { verifyToken } = require("../../modules/functions");

async function isUserLogedIn(req, res, next) {
  const authError = {
    status: 400,
    message: "Please login first",
  };
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization) throw authError;
    const token = authorization?.split(" ")?.[1];
    if (!token) throw authError;
    const result = verifyToken(token);
    const { payload } = result;
    const user = await userModel.findOne(
      { username: payload },
      { password: 0 }
    );
    if (!user) throw authError;
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isUserLogedIn,
};
