"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const UPLOAD_DIR = "/uploads";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = req.query.folderName;
        const uploadFolder = path_1.default.join(UPLOAD_DIR, file.mimetype.split("/")[0], destinationPath);
        fs_1.default.mkdir(uploadFolder, { recursive: true }, (err) => {
            cb(null, uploadFolder);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.uploads = (0, multer_1.default)({ storage });
