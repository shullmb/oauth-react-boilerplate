import { Router } from "express";
import User from "../models/user";
import axios from "axios";

const router = Router();

router.get("/:id/repos", (req, res) => {
	let config = {
		headers: {
			Authorization: `Bearer ${req.user.accessToken}`,
			"User-Agent": `shullmb-oauth-boilerplate`
		}
	};
	axios
		.get("https://api.github.com/user/repos", config)
		.then(response => {
			res.json({ user: req.user, repos: response.data });
		})
		.catch(err => console.log(err));
});

export default router;
