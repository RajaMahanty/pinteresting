import Comment from "../models/comment.model.js";
import mongoose from "mongoose";

export const getPostComments = async (req, res) => {
	const { postId } = req.params;

	const comments = await Comment.find({ pin: postId })
		.populate("user", "username img displayName")
		.sort({ createdAt: -1 });

	res.status(200).json(comments);
};
