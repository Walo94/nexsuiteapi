import { Router } from "express";
import { CategoriaController } from "@/controllers/mp/CategoriaController";

const router = Router();

router.get("/", CategoriaController.getAll);
router.post("/", CategoriaController.create);
router.put("/:id", CategoriaController.update);
router.patch("/:id/toggle-status", CategoriaController.toggleStatus);

export default router;
