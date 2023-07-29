const mongoose = require("mongoose");
const { AllRoutes } = require("./router/index.router");
class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "../public")));
  }
  configDatabase(DB_URL) {
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("DB connected successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app).listen(PORT, () => {
      console.log("listening on port " + PORT);
    });
  }

  createRoutes() {
    this.#app.use(AllRoutes);
    this.#app.get("/", (req, res, next) => {
      res.json({
        status: 200,
        message: "hello express",
      });
    });
  }
  errorHandler() {
    this.#app.use((err, req, res, next) => {
      const statusCode = err?.status ?? err?.statusCode ?? 500;
      const errorMessage = err?.message ?? "InternalServerError";
      return res.status(statusCode).json({
        status: statusCode,
        message: errorMessage,
      });
    });
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        message: "Page not found 404!",
      });
    });
  }
}

module.exports = Application;
