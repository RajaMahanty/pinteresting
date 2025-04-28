import { model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		displayName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model("User", userSchema);
