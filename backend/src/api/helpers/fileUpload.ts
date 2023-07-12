import multer, { diskStorage } from "multer";
import { IRequest } from "./requestInterface";
import path from "path";

const fileStorage = diskStorage({
	destination: function (req: IRequest, file: any, cb) {
		cb(null, __dirname + "../../../static/uploads");
	},
	filename: function (req, file, cb) {
		let datetimestamp = Date.now();
		cb(
			null,
			file.fieldname +
				"-" +
				datetimestamp +
				"." +
				file.originalname.split(".")[
					file.originalname.split(".").length - 1
				]
		);
	},
});

const fileUpload = multer({
	storage: fileStorage,
	limits: {
		files: 5,
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: function (req, file, callback) {
		let ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
			return callback(new Error("Only images are allowed"));
		}
		callback(null, true);
	},
});

export default fileUpload;