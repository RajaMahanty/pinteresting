import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
	const { username, password, email, displayName } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	const newHashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		username,
		email,
		displayName,
		hashedPassword: newHashedPassword,
	});

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "prod",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});

	const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

	res.status(201).json(detailsWithoutPassword);
};

export const loginUser = async (req, res) => {
	const { password, email } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

	if (!isPasswordCorrect) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "prod",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});

	const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

	res.status(200).json(detailsWithoutPassword);
};

export const logoutUser = async (req, res) => {
	res.clearCookie("token");

	res.status(200).json({ message: "Logout Successfull!" });
};

export const getUser = async (req, res) => {
	const { username } = req.params;

	const user = await User.findOne({ username });

	const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

	res.status(200).json(detailsWithoutPassword);
};
