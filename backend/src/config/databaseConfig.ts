import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/v1up";

export default function initConnection(callback: Function) {
	mongoose.connect(uri, (err) => {
		if (!err) {
			console.log("Database Connected Successfully");
		} else {
			console.log("Error in connecting to database!");
		}
	});
	let db = mongoose.connection;
	db.on('error', function (err) {
	  console.log('Failed to connect to database');
	  process.exit(1);
	});
  
	db.once('open', function () {
		console.log("Connected to database");
	  callback();
	});
  };