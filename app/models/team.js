const { default: mongoose } = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    descriptiotn: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, required: true },
    projects: { type: [mongoose.Types.ObjectId], default: [], required: false },
  },
  {
    timestamps: true,
  }
);

const teamModel = mongoose.model("team", teamSchema);

module.exports = {
  teamModel,
};
