import { Router } from "express";

const router = Router();

import { getter } from "../controllers/getter";

router.route("/").get(getter);

export default router;
