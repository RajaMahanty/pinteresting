import Comment from "../models/comment.model.js";

export const getPostComments = async (req, res) => {
	const { postId } = req.params;

	const comments = await Comment.find({ pin: postId })
		.populate("user", "username img displayName")
		.sort({ createdAt: -1 });

	res.status(200).json(comments);
};

export const addComment = async (req, res) => {
	const { description, pin } = req.body;
	const userId = req.userId;
	const comment = await Comment.create({ description, pin, user: userId });
	res.status(201).json(comment);
};

export const removeComment = async (req, res) => {
	const { commentId } = req.params;
	const userId = req.userId;

	const comment = await Comment.findById(commentId);

	if (!comment) return res.status(404).json({ message: "Comment not found!" });

	if (comment.user.toString() !== userId) {
		return res
			.status(403)
			.json({ message: "You can only delete your own comments!" });
	}

	await Comment.findByIdAndDelete(commentId);
	res.status(200).json({ message: "Comment deleted successfully!" });
};
