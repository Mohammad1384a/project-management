const { body } = require("express-validator");

function createTeamValidator() {
  return [
    body("name")
      .isLength({ min: 5, max: 10 })
      .withMessage("Project name must be between 5 and 10 characters"),
    body("description")
      .notEmpty()
      .withMessage("Project description cannot be empty"),
    body("owner").isMongoId().withMessage("Please enter a valid id"),
    body("projects").custom((value, { req }) => {
      if (!value || value.length === 0 || !req.body.projects) return [];
      return value;
    }),
  ];
}

module.exports = {
  createTeamValidator,
};
