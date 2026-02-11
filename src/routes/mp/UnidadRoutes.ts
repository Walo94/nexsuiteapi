import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { UnidadController } from "@/controllers/mp/UnidadController";

const router = Router();

router.get("/", authMiddleware, UnidadController.getAll);
router.post("/", authMiddleware, UnidadController.create);
router.put("/:id", authMiddleware, UnidadController.update);
router.patch("/:id/toggle-status", authMiddleware, UnidadController.toggleStatus);

export default router;
