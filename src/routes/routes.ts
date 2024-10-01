import { Router } from "express";
import { API } from "../utils/constant";
import { fileController } from "../controllers/file.controller";
import { uploads } from "../middleware/storage";

const storageRoutes = Router();
storageRoutes.post(
  `${API.API_CONTEXT}/${API.UPLOADS_IMAGE}`,
  uploads.single("file"),
  fileController.uploadsFileController
);

export default storageRoutes;
