import { Router } from "express";

import { getUser, getUsers, postUser } from "../controllers/userController";

const router = Router();

// Get all users
router.get("/users", getUsers);
// Create a user
router.post("/users/", postUser);
// Get a specific user by id
router.get("/users/:id", getUser);

export default router;
