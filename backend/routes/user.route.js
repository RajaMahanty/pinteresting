import express from "express";
import { test } from "../controllers/user.controller.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/create", async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	await User.create({
		displayName: req.body.displayName,
		username: req.body.username,
		email: req.body.email,
		hashedPassword,
	});

	res.json("User created!");
});

router.get("/fetch", async (req, res) => {
	const users = await User.find();

	res.json(users);
});

export default router;
