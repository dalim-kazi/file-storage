import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { convertImageToWebP } from "../helpers/convert.to.webp";
import FileModels from "../models/file.model";
import { envConfig } from "../utils/env.config";

const uploadsFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const { originalname, filename, path: filePath } = file;
    // Define output directory and new WebP file name (replace extension with .webp)
    const outputDir = path.dirname(filePath);
    const webpFileName = filename.replace(path.extname(filename), ".webp");
    const webpFilePath = path.join(outputDir, webpFileName);
    // Read the uploaded image file into a buffer
    const imageBuffer = fs.readFileSync(filePath);
    // Convert the image to WebP format
    await convertImageToWebP({
      imageBuffer,
      outputPath: webpFilePath,
      quality: 80,
    });

    const webpOriginalName = originalname.replace(
      path.extname(originalname),
      ".webp"
    );
    console.log(`${envConfig.BASE_URL}${webpFilePath}`);
    const result = await new FileModels({
      originalname: webpOriginalName,
      filename: webpFileName,
      path: webpFilePath,
      destination: file?.destination,
      size: file?.size,
      mimetype: file?.mimetype,
      imageUrl: `${envConfig.BASE_URL}${webpFilePath}`,
    }).save();

    // Respond with the updated file details
    res.json({
      success: true,
      message: "Image converted successfully",
      result,
    });
  } catch (error) {
    console.error("Error uploading and converting file:", error);
    res.status(500).json({ error: "Failed to upload and convert file" });
  }
};

export const fileController = {
  uploadsFileController,
};
