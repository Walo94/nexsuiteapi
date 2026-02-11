import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { ProveedorController } from "@/controllers/mp/ProveedorController";

const router = Router();

router.get("/", authMiddleware, ProveedorController.getAll);
router.post("/", authMiddleware, ProveedorController.create);
router.put("/:id", authMiddleware, ProveedorController.update);
router.patch("/:id/toggle-status", authMiddleware, ProveedorController.toggleStatus);

export default router;
