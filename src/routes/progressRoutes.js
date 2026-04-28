import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createProgress, deleteProgress, getProgress, listProgress, updateProgress } from "../controllers/progressController.js";

const router = Router();
router.use(authenticate);
router.post("/", createProgress);
router.get("/", listProgress);
router.get("/:id", getProgress);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

export default router;
