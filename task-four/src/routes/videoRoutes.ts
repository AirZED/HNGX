import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

import {
  getSingleVideo,
  createVideo,
  getAllVideos,
} from "../controllers/videoController";

router.route("/").get(getAllVideos).post(upload.single("video"), createVideo);

router.route("/:id").get(getSingleVideo);

export default router;
