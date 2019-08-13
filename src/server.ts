import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import express from "express";
import session from "express-session";
import mongoose from "mongoose";

const app = express();

app.use(express.static(__dirname + "/client/build/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log(`connected to mongo at`));
db.on("error", err => console.log(err));

app.get("*", (req, res) => {
	res.sendFile("index.html");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("rolling with ts on", port));
