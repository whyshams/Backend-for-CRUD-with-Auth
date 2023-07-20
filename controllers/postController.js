const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().lean();

  if (!posts?.length) {
    return res.status(400).json({ message: "no posts found :( " });
  }
  res.json(posts);
});

const createPost = asyncHandler(async (req, res) => {});

const updatePost = asyncHandler(async (req, res) => {});

const deletPost = asyncHandler(async (req, res) => {});

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletPost,
};
