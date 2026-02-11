import { Request, Response } from "express";
import { ProveedorService } from "@/services/mp/ProveedorService";

export const ProveedorController = {
  async create(req: Request, res: Response) {
    try {
      const result = await ProveedorService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const proveedores = await ProveedorService.getAll();
      res.json(proveedores);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ProveedorService.update(Number(id), req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ProveedorService.toggleStatus(Number(id));
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};