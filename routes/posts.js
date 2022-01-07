import express from "express";
const router = express.Router();
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

// http://localhost:5000/posts
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
