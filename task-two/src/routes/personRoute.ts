import { Router } from "express";

const router = Router();

import {
  createPerson,
  fetchPerson,
  patchPerson,
  deletePerson,
  getAll,
} from "../controllers/personController";

router.route("/").get(getAll).post(createPerson);

router.route("/:id").get(fetchPerson).patch(patchPerson).delete(deletePerson);

export default router;
