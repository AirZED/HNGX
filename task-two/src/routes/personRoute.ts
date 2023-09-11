import { Router } from "express";

const router = Router();

import {
  createPerson,
  fetchPerson,
  patchPerson,
  deletePerson,
} from "../controllers/personController";

router.route("/").post(createPerson);

router.route("/:id").get(fetchPerson).patch(patchPerson).delete(deletePerson);

export default router;
