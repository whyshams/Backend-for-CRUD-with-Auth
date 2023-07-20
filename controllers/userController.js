const User = require("../models/User");
const Post = require("../models/post");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//get all user

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users?.length) {
    return res.status(404).json({ message: "No user found" });
  }
  res.json(users);
});

//create new user

const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !roles.length) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPass, roles };

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "username already exists" });
  }

  const user = await User.create(newUser);

  if (user) {
    res.status(200).json({ message: `new user ${username} created` });
  } else {
    res.status(404).json({ message: "invalid username password" });
  }
});

//update user

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles } = req.body;

  if (!id || !username) {
    return res.status(400).json({ message: "user not found" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    res.status(400).json({ message: "username already taken" });
  }

  user.username = username;
  user.roles = roles;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = user.save();

  res.status(200).json({ message: "Profile Updated" });
});

//delete user

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = await User.findById(id).exec();

  if (!user) {
  }

  const result = await user.deleteOne();

  res.status(200).json(`${result.username} was deleted`);
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
