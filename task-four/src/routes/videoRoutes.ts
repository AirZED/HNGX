import { Router } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/../../uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

const router = Router();

import {
  getSingleVideo,
  createVideo,
  getAllVideos,
} from "../controllers/videoController";

router.route("/").get(getAllVideos).post(uploads.single("file"), createVideo);

router.route("/:id").get(getSingleVideo);

export default router;
