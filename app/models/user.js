const { Schema, model } = reuire("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: String, default: ["USER"] },
    email: { type: String, required: true, unique: true },
    passpord: { type: String, required: true },
    skills: { type: String, default: [] },
    teams: { type: String, default: [] },
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);

module.exports = {
  userModel,
};
