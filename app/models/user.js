const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, required: true, unique: true },
    passpord: { type: String },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

module.exports = {
  userModel,
};
