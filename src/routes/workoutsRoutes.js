import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createWorkout, deleteWorkout, getWorkout, listWorkouts, updateWorkout } from "../controllers/workoutsController.js";

const router = Router();
router.use(authenticate);
router.post("/", createWorkout);
router.get("/", listWorkouts);
router.get("/:id", getWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
