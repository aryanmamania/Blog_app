import express  from "express";
import { verifyToken } from "../utils/verifyUser";
import { create, deletepost, getPosts, updatePost } from "../controllers/post.controller";


const router= express.Router();
router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts)
router.delete('/deletepost:postId/:userId', verifyToken, deletepost)
router.put('/updatePost/:postId/:userId', verifyToken, updatePost)

export default router;