import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { MaterialController } from "@/controllers/mp/MaterialController";

const router = Router();

router.get("/", authMiddleware, MaterialController.getAll);
router.post("/", authMiddleware, MaterialController.create);
router.put("/:id", authMiddleware, MaterialController.update);
router.patch("/:id/toggle-status", authMiddleware, MaterialController.toggleStatus);

export default router;
