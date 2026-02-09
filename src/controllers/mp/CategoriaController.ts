import { Request, Response } from "express";
import { CategoriaService } from "@/services/mp/CategoriaService";

export const CategoriaController = {
  async create(req: Request, res: Response) {
    try {
      const result = await CategoriaService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const categorias = await CategoriaService.getAll();
      res.json(categorias);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoriaService.update(Number(id), req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoriaService.toggleStatus(Number(id));
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
