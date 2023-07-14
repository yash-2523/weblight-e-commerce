import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import http from "http";
import { errorHandlerMiddleware } from "./api/middlewares";
import APIRoutes from "./api/routes";
const socket = require("socket.io");
// Setting up express basics
const app = express();

// Basics for express application
// cors allow http:localhost:3000 to access our server
app.use(cors());

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Starting secured server with all loaded certificates
const server: any = http.createServer(app);
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

export { app, server };
	