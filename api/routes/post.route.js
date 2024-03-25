import express  from "express";
import { verifyToken } from "../utils/verifyUser";
import { create, deletepost, getPosts } from "../controllers/post.controller";

const router= express.Router();
router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts)
router.get('/deletepost:postId/:userId', verifyToken, deletepost)

export default router;