const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    projectImage: { type: String },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    isPrivate: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("project", projectSchema);

module.exports = {
  projectModel,
};
