const { Schema, model, default: mongoose, Mongoose } = require("mongoose");
const path = require("path");

const inviteSchema = new Schema({
  requestDate: { type: Date, required: true, default: Date.now() },
  invitor: { type: mongoose.Types.ObjectId, require: true },
  teamId: { type: mongoose.Types.ObjectId, required: true },
  status: { type: String, default: "pending" },
});

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profileImage: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequests: { type: [inviteSchema] },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

module.exports = {
  userModel,
};
