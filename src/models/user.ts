import { Schema, model } from "mongoose";

const userSchema = new Schema({
	githubId: {
		type: Number,
		required: [true, "This is literally the only thing in this model"]
	}
});

userSchema.set("toObject", {
	transform: function(doc, ret, options) {
		let returnJson = {
			_id: ret._id,
			githubId: ret.githubId
		};
		return returnJson;
	}
});

export default model("User", userSchema);
