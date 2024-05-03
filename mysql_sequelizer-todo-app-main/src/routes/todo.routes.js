const express = require("express");

const {
  registerUser,
  getallUsers,
} = require("../controllers/user.controllers.js");
const { userRegisterValidator } = require("../validators/user.validators.js");
const { validate } = require("../validators/validators.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createTodo,
  getTodo,
  getAllTodo,
} = require("../controllers/todo.controllers.js");
const { apiDecryption } = require("../middlewares/decryption.middlewares.js");
const { todoSchema } = require("../validators/todo.validators.js");

const router = express.Router();

// router.use(verifyJWT)

router
  .route("/create-todo")
  .post(apiDecryption, todoSchema(), validate, createTodo);

router.route("/getTodo").get(getTodo);
router.route("/getAllTodo").get(getAllTodo);

module.exports = router;
