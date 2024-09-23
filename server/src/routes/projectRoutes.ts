import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = Router();

router.get("/projects", getProjects);
router.post("/projects", createProject);

export default router;
