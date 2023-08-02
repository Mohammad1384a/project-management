const { body } = require("express-validator");
const path = require("path");

function createProjectValidator() {
  return [
    body("title")
      .notEmpty()
      .withMessage("Please select a title for your project"),
    body("text")
      .isLength({ min: 15 })
      .withMessage("Project description should at least contain 15 characters"),
    body("projectImage").custom((image, { req }) => {
      if (Object.keys(req.file).length == 0) {
        throw "Please select a file";
      }
      const validExts = [".jpg", ".png", ".jpeg", ".gpeg", ".webp"];
      const ext = path.extname(req.file.originalname);
      if (!validExts.includes(ext)) {
        throw "invalid file extension";
      }
      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) {
        throw "file cannot be larger than 2MB";
      }
      return true;
    }),
  ];
}

module.exports = {
  createProjectValidator,
};
