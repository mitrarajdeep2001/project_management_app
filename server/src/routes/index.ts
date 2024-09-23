import { Router } from "express";
import projectRoutes from "./projectRoutes";
import taskRoutes from "./taskRoutes";
import userRoutes from "./userRoutes";
import teamRoutes from "./teamRoutes";
import searchRoutes from "./searchRoutes";

const router = Router();

router.use(projectRoutes)
router.use(taskRoutes)
router.use(userRoutes)
router.use(teamRoutes)
router.use(searchRoutes)

export default router;