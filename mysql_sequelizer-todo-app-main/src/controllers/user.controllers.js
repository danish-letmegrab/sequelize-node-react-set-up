const db = require("../models");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiErrors");

const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.utils");

const color = require("colors");
const { Op } = require("sequelize");
const { logger } = require("../logger/winston.logger");

const User = db.User;

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(color.green(email));

  const existingUser = await User.findOne({ where: { email: email } });

  if (existingUser) {
    logger.error("User with email or username already exists");
    throw new ApiError(409, "User with email or username already exists", []);
  }

  const hashedPassword = await bcryptUtil.createHash(password);

  const userData = {
    email: email,
    password: hashedPassword,
  };

  const newUser = await User.create(userData);

  if (newUser.dataValues.password) {
    delete newUser.dataValues.password;
  }

  newUser.dataValues.token = await jwtUtil.createToken(newUser.id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: newUser }, "Users registered successfully.")
    );
});

//  LOGIN USER FOR

// GET ALL USER AND FILTER

const getallUsers = asyncHandler(async (req, res) => {
  const { username, email } = req.query;

  console.log("check the username", username);

  let whereClause = {};

  if (username || email) {
    whereClause = {
      [Op.and]: [{ email: { [Op.like]: `%${email}%` } }],
    };
  }

  const allUsers = await User.findAll({
    where: whereClause,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, allUsers, "Users retrieved successfully..."));
});

// return res
//   .status(200)
//   .json(
//     new ApiResponse(
//       200,
//       { user: createdUser },
//           "Users registered successfully and verification email has been sent on your email."
//     )
//   );

module.exports = { registerUser, getallUsers };
