const multer = require("multer");
const { createPath } = require("./functions");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createPath());
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file?.filename ?? file?.originalname ?? "");
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
