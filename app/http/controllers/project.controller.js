const { projectModel } = require("../../models/project");
class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, text, tags } = req.body;
      const owner = req.user._id;
      const imageAddress =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        req.file?.path?.substring(7).replace(/[\\\\]/gm, "/");
      const project = await projectModel.create({
        title,
        text,
        projectImage: imageAddress,
        tags,
        owner,
      });
      if (!project) {
        throw {
          status: 400,
          message: "failed to create project",
        };
      }
      return res.status(200).json({
        status: 200,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProjects(req, res, next) {
    try {
      owner = req.user._id;
      const projects = await projectModel.find({ owner });
      if (!projects) {
        throw "You have no project";
      }
      return res.status(200).json({
        status: 200,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }
  getProjectById() {}
  getAllProjectsOfTeam() {}
  getProjectsOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = new ProjectController();
