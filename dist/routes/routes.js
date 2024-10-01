"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constant_1 = require("../utils/constant");
const file_controller_1 = require("../controllers/file.controller");
const storage_1 = require("../middleware/storage");
const storageRoutes = (0, express_1.Router)();
storageRoutes.post(`${constant_1.API.API_CONTEXT}/${constant_1.API.UPLOADS_IMAGE}`, storage_1.uploads.single("file"), file_controller_1.fileController.uploadsFileController);
exports.default = storageRoutes;
