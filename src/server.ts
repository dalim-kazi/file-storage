import express, { Request, Response } from "express";
import connectDB from "./utils/db";
import storageRoutes from "./routes/routes";
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use(storageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("file storage server is running?");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
