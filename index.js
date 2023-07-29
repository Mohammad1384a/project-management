const Application = require("./app/server");
DB_URL =
  "mongodb+srv://abedinimcf:yxKVygS28pX82Ac3@cluster0.xsssq0d.mongodb.net/";
new Application(3000, DB_URL);
