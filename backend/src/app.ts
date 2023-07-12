import express from "express";
import path from "path";
const cookieParser = require("cookie-parser");
import fs from "fs";
const session = require("express-session");
import cors from "cors";
// import "dotenv/config";
import https from "https";
import http from "http";
import { errorHandlerMiddleware } from "./api/middlewares";
import APIRoutes from "./api/routes";
const socket = require("socket.io");
// Setting up express basics
const app = express();

// Basics for express application
app.use("trust proxy", () => true);
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

let location = "";

// Importing files of SSL certificate
var privateKey = fs.readFileSync(location + "privkey.pem", {encoding:"utf8",flag:"r"});
var certificate = fs.readFileSync(location + "fullchain.pem", {encoding:"utf8",flag:"r"});

const credentials = {
	key: privateKey,
	cert: certificate,
};

// Starting secured server with all loaded certificates
const server: any = https.createServer(credentials, app);
// Initializing Socket Server
const io = socket(server);

// Adding io as request parameter so we can use easily in further routes
app.use((req: any, res, next) => {
	req.io = io;
	next();
});

// Setting up routes
app.use("/api", APIRoutes);
// Adding Angular Website
app.use("/doc", express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "static")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../static", "public/index.html"));
});

app.use(errorHandlerMiddleware);
if(process.env.NODE_ENV !== "production"){
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export { app, server };
	