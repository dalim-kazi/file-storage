"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const convert_to_webp_1 = require("../helpers/convert.to.webp");
const file_model_1 = __importDefault(require("../models/file.model"));
const env_config_1 = require("../utils/env.config");
const uploadsFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const { originalname, filename, path: filePath } = file;
        // Define output directory and new WebP file name (replace extension with .webp)
        const outputDir = path_1.default.dirname(filePath);
        const webpFileName = filename.replace(path_1.default.extname(filename), ".webp");
        const webpFilePath = path_1.default.join(outputDir, webpFileName);
        // Read the uploaded image file into a buffer
        const imageBuffer = fs_1.default.readFileSync(filePath);
        // Convert the image to WebP format
        yield (0, convert_to_webp_1.convertImageToWebP)({
            imageBuffer,
            outputPath: webpFilePath,
            quality: 80,
        });
        const webpOriginalName = originalname.replace(path_1.default.extname(originalname), ".webp");
        const result = yield new file_model_1.default({
            originalname: webpOriginalName,
            filename: webpFileName,
            path: webpFilePath,
            destination: file === null || file === void 0 ? void 0 : file.destination,
            size: file === null || file === void 0 ? void 0 : file.size,
            mimetype: file === null || file === void 0 ? void 0 : file.mimetype,
            imageUrl: `${env_config_1.envConfig.BASE_URL}${webpFilePath}`,
        }).save();
        // Respond with the updated file details
        res.json({
            success: true,
            message: "Image converted successfully",
            result,
        });
    }
    catch (error) {
        console.error("Error uploading and converting file:", error);
        res.status(500).json({ error: "Failed to upload and convert file" });
    }
});
exports.fileController = {
    uploadsFileController,
};
