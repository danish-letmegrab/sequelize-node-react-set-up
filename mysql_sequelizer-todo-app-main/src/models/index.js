const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
const colors = require("colors");

const sequelize = new Sequelize("demo", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log(colors.blue("Models synchronized successfully."));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Synchronize models with the database

const db = {};

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = sequelize;

//* IMPORT MODELS

db.User = require("./user.models.js")(sequelize, Sequelize, DataTypes);
db.Todo = require("./todo.modules.js")(sequelize, Sequelize, DataTypes);

//* ASSOCIATE MODELS

db.User.hasMany(db.Todo, { foreignKey: "user_id" });
db.Todo.belongsTo(db.User, { foreignKey: "user_id" });

db.User.hasMany(db.Todo, { foreignKey: "assigned_to" });
db.Todo.belongsTo(db.User, { foreignKey: "assigned_to" });

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true for development, false for production
    console.log("Models synchronized successfully....");
  } catch (error) {
    console.error("Unable to synchronize models with the database:", error);
  }
})();

module.exports = db;
