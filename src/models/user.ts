import { Schema, model } from "mongoose";

const userSchema = new Schema({
	githubId: {
		type: Number,
		required: [true]
	}
});

export default model("User", userSchema);
