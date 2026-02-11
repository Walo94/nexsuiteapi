import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { CategoriaController } from "@/controllers/mp/CategoriaController";

const router = Router();

router.get("/", authMiddleware, CategoriaController.getAll);
router.post("/", authMiddleware, CategoriaController.create);
router.put("/:id", authMiddleware, CategoriaController.update);
router.patch("/:id/toggle-status", authMiddleware, CategoriaController.toggleStatus);

export default router;
