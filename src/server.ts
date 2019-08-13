import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "./config/ppConfig";

const app = express();

app.use(express.static(__dirname + "/../client/build/"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () =>
	console.log(`connected to mongo at ${process.env.MONGODB_URI}`)
);
db.on("error", err => console.log(err));

// configure session middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	})
);

// configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

import authRouter from "./controllers/auth";
import apiRouter from "./controllers/api";

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.get("*", (req, res) => {
	res.sendFile("index.html");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("rolling with ts on", port));
