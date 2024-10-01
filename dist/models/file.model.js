"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    originalname: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});
const FileModels = (0, mongoose_1.model)("file-storage", fileSchema);
exports.default = FileModels;
