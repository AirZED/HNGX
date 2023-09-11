import { Router } from "express";

const router = Router();

import {
  createUser,
  fetchUser,
  patchUser,
  deleteUser,
} from "../controllers/userController";

router.route("/").post(createUser);

router.route("/:id").get(fetchUser).patch(patchUser).delete(deleteUser);

export default router;
