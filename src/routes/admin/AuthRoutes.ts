import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { AuthController } from "@/controllers/admin/AuthController";

const router = Router();

// IMPORTANTE: Las rutas más específicas deben ir ANTES de las genéricas
// /perfil debe estar ANTES de /:id o Express lo interpretará como id="perfil"

router.post("/login", AuthController.login);
router.get("/perfil", authMiddleware, AuthController.getPerfil);

router.post("/", authMiddleware, AuthController.create);
router.get("/", authMiddleware, AuthController.getAll);
router.get("/:id", authMiddleware, AuthController.getById);
router.put("/:id", authMiddleware, AuthController.update);
router.patch("/:id/toggle-status", authMiddleware, AuthController.toggleStatus);

export default router;