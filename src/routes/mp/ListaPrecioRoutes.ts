import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth";
import { ListaPrecioController } from "@/controllers/mp/ListaPrecioController";

const router = Router();

// Rutas principales
router.get("/", authMiddleware, ListaPrecioController.getAll);
router.get("/:id", authMiddleware, ListaPrecioController.getById);
router.get("/proveedor/:proveedorId", authMiddleware, ListaPrecioController.getByProveedor);
router.post("/", authMiddleware, ListaPrecioController.create);
router.put("/:id", authMiddleware, ListaPrecioController.update);
router.patch("/:id/toggle-status", authMiddleware, ListaPrecioController.toggleStatus);
router.delete("/:id", authMiddleware, ListaPrecioController.delete);

// Rutas para gestión de materiales individuales
router.post("/:id/materiales", authMiddleware, ListaPrecioController.addMaterial);
router.put("/:id/materiales/:detalleId", authMiddleware, ListaPrecioController.updateMaterial);
router.delete("/:id/materiales/:detalleId", authMiddleware, ListaPrecioController.removeMaterial);

export default router;