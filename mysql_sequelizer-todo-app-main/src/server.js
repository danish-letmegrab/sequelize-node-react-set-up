const express = require("express");
var cors = require("cors");
const app = express();
const { morganMiddleware } = require("./logger/morgan.logger.js");

require("dotenv").config();

app.use(morganMiddleware);
app.use(cors());

const userRoutes = require("./routes/user.routes.js");
const todoRoutes = require("./routes/todo.routes.js");
const { errorHandler } = require("./middlewares/error.middleware.js");

// Sync the models with the database

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);

// sequelize.sync().then(() => {
//   console.log("Database synced");
// });

app.use(errorHandler);

const db = require("./models");

module.exports = app;
