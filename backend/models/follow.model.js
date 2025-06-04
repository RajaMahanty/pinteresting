import { model, Schema } from "mongoose";

const followSchema = new Schema(
	{
		follower: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		following: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default model("Follow", followSchema);
