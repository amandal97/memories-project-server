import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // check if id is MongoDB Object ID
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "No post with that id!" });

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "No post with that id!" });

  try {
    await PostMessage.findByIdAndRemove(_id);
    res.json({ message: "Post deleted Successfully!" });
  } catch (err) {
    res.json({ message: err });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "No post with that id!" });
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
};
