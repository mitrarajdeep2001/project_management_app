import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.patch("/tasks/:taskId/status", updateTaskStatus);
router.get("/tasks/user/:userId", getUserTasks);

export default router;
