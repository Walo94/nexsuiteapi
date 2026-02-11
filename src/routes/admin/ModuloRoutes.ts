import { Router } from "express";
import { ModuloController } from "@/controllers/admin/ModuloController";

const router = Router();

router.get("/", ModuloController.getAll);

export default router;