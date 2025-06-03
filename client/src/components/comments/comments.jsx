import "./comments.css";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest.js";
import Comment from "../comments/comment.jsx";
import CommentForm from "./commentForm.jsx";

const Comments = ({ id }) => {
	const { isPending, error, data } = useQuery({
		queryKey: ["comments", id],
		queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred:" + error.message;

	if (!data) return "No comments found!";

	return (
		<div className="comments">
			<div className="commentList">
				<span className="commentCount">
					{data.length === 0 ? "No Comments" : data.length + " Comments"}
				</span>
				{/* COMMENT */}
				{data.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
			</div>
			<CommentForm id={id} />
		</div>
	);
};

export default Comments;
