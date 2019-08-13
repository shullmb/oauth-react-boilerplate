import { Router } from "express";
import passport from "../config/ppConfig";

const router = Router();

// GET /auth/github - displays GH login
router.get("/github", passport.authenticate("github"));

// GET /auth/github/callback - cb that receives the token
router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/auth/login"
	}),
	(req, res) => {
		// auth success!
		console.log("this is the gh user:\n", req.user);
		res.render("success", { user: req.user });
	}
);

export default router;
