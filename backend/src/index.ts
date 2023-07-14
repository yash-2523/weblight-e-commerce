require("dotenv").config();
import { server } from "./app";

const PORT = process.env.PORT || 5000;
import dbConfig from "./config/databaseConfig";

dbConfig(() => {
	server.listen(PORT, () => {
		console.log("HTTP Server started on PORT " + server.address().port);
	});
})


