import { Request, Response } from "express";
import { AppDataSource } from "@/config/data-source";
import { Modulo } from "@/entities/admin/Modulo";

const moduloRepo = AppDataSource.getRepository(Modulo);

export const ModuloController = {
  /** GET /modulos - Obtener todos los módulos activos ordenados */
  async getAll(req: Request, res: Response) {
    try {
      const modulos = await moduloRepo.find({
        where: { isActive: true },
        order: { orden: "ASC" },
      });
      res.json(modulos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};