import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = req.query.folderName as string;
    const uploadFolder = path.join(
      UPLOAD_DIR,
      file.mimetype.split("/")[0],
      destinationPath
    );
    fs.mkdir(uploadFolder, { recursive: true }, (err) => {
      cb(null, uploadFolder);
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploads = multer({ storage });
