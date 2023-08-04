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
  async getProjectById(req, res, next) {
    try {
      const id = req.params?.id;
      const owner = req.user?._id;
      const project = await projectModel.findOne({ owner, _id: id });
      if (!project) {
        throw "project not found";
      }
      return res.status(200).json({
        status: 200,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProjectById(req, res, next) {
    try {
      const id = req.params?.id;
      const owner = req.user?._id;
      const deleteProject = await projectModel.deleteOne({ _id: id, owner });
      if (deleteProject.deletedCount === 0) throw "deletion failed";
      return res.status(200).json({
        status: 200,
        message: "project removed successfully",
        deleteProject,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProjectsOfUser(req, res, next) {
    try {
      const owner = req.user?._id;
      const userProjects = await projectModel.find({ owner });
      if (!userProjects) throw "you have no project";
      return res.status(200).json({
        status: 200,
        userProjects,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProject(req, res, next) {
    try {
      const _id = req.params.id;
      const owner = req.user?._id;
      const isProjectValid = await projectModel.findOne({ _id, owner });
      if (!isProjectValid) throw "project not found";
      const imageAddress =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        req.file?.path?.substring(7).replace(/[\\\\]/gm, "/");
      let data = { ...req.body };
      data.projectImage = imageAddress;
      Object.entries(data).forEach(([key, value]) => {
        const validEntries = ["text", "title", "tags", "projectImage"];
        if (!validEntries.includes(key)) {
          delete data[key];
        }
      });
      const result = data.tags.filter((t) => t.length > 0);
      data.tags = result;
      const updateProject = await projectModel.updateOne(
        { _id },
        { $set: data }
      );
      if (updateProject.modifiedCount === 0) throw "updating project failed";
      return res.status(200).json({
        status: 200,
        updateProject,
      });
    } catch (error) {
      next(error);
    }
  }
  getAllProjectsOfTeam() {}
}

module.exports = new ProjectController();
