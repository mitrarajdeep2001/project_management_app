import { Router } from "express";

import { getUser, getUsers, postUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.post("/users/", postUser);
router.get("/users/:id", getUser);

export default router;
