import express from "express";
import {
	getPostComments,
	addComment,
	removeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/", verifyToken, addComment);
router.delete("/:commentId", verifyToken, removeComment);

export default router;
