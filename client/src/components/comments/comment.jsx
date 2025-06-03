import Image from "../image/image";
import { format } from "timeago.js";
import { MdDelete } from "react-icons/md";
import "./comment.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { useAuthStore } from "../../utils/authStore";

const Comment = ({ comment }) => {
	const queryClient = useQueryClient();
	const { currentUser } = useAuthStore();

	const deleteMutation = useMutation({
		mutationFn: () => apiRequest.delete(`/comments/${comment._id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this comment?")) {
			deleteMutation.mutate();
		}
	};

	const isCurrentUser = currentUser?._id === comment.user._id;

	return (
		<div className="comment">
			<Image path={comment.user.img || "/general/noAvatar.png"} alt={""} />
			<div className="commentContent">
				<span className="commentUsername">{comment.user.displayName}</span>
				<p className="commentText">{comment.description}</p>
				<span className="commentTime">{format(comment.createdAt)}</span>
			</div>
			{isCurrentUser && (
				<MdDelete
					className="deleteComment"
					onClick={handleDelete}
					style={{ cursor: "pointer" }}
				/>
			)}
		</div>
	);
};

export default Comment;
