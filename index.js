const Application = require("./app/server");
DB_URL =
  "mongodb+srv://abedinimcf:usUQ9vmLxYQfciik@cluster0.xsssq0d.mongodb.net/";
new Application(3000, DB_URL);
