const { validationResult } = require("express-validator");
function validationMapper(req, res, next) {
  let messages = {};
  const result = validationResult(req);
  if (result?.errors?.length > 0) {
    result?.errors.forEach((err) => {
      messages[err.path] = err?.msg ?? err?.value;
    });
    return res.status(400).json(messages);
  }
  next();
}

module.exports = {
  validationMapper,
};
