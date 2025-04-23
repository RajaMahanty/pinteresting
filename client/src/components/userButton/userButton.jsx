import { useState } from "react";
import "./userButton.css";
import Image from "../image/image";

const UserButton = () => {
	const [open, setOpen] = useState(false);

	// TEMP USER
	const currentUser = true;
	return currentUser ? (
		<div className="userButton">
			<Image path="/general/noAvatar.png" alt="" />
			<Image
				path="/general/arrow.svg"
				onClick={() => setOpen((prev) => !prev)}
				className="arrow"
				alt=""
			/>
			{open && (
				<div className="userOptions">
					<div className="userOption">Profile</div>
					<div className="userOption">Settings</div>
					<div className="userOption">Logout</div>
				</div>
			)}
		</div>
	) : (
		<a href="/" className="loginLink">
			Login / Sign Up
		</a>
	);
};

export default UserButton;
