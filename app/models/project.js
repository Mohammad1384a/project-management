const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    imgae: { type: String, default: "/defaults/13.jpg" },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("team", projectSchema);

module.exports = {
  projectModel,
};
