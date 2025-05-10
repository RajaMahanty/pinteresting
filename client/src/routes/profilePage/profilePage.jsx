import "./profilePage.css";
import Image from "../../components/image/image";
import { useState } from "react";
import Boards from "../../components/boards/boards";
import Gallery from "../../components/gallery/gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest";

const ProfilePage = () => {
	const [type, setType] = useState("saved");

	const { username } = useParams();

	const { isPending, error, data } = useQuery({
		queryKey: ["profile", username],
		queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred:" + error.message;

	if (!data) return "User not found!";

	console.log(data);

	return (
		<div className="profilePage">
			<Image
				className="profileImg"
				w={100}
				h={100}
				src={data.img || "/general/noAvatar.png"}
			/>
			<h1 className="profileName">{data.displayName}</h1>
			<span className="profileUsername">@{data.username}</span>
			<div className="followCounts">10 followers . 20 followings</div>
			<div className="profileInteractions">
				<Image path="/general/share.svg" />
				<div className="profileButtons">
					<button>Message</button>
					<button>Follow</button>
				</div>
				<Image path="/general/more.svg" />
			</div>
			<div className="profileOptions">
				<span
					onClick={() => setType("created")}
					className={type === "created" ? "active" : ""}
				>
					Created
				</span>
				<span
					onClick={() => setType("saved")}
					className={type === "saved" ? "active" : ""}
				>
					Saved
				</span>
			</div>
			{type === "created" ? (
				<Gallery userId={data._id} />
			) : (
				<Boards userId={data._id} />
			)}
		</div>
	);
};

export default ProfilePage;
