import { Request, Response } from "express";
import { UnidadService } from "@/services/mp/UnidadService";

export const UnidadController = {
  async create(req: Request, res: Response) {
    try {
      const result = await UnidadService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const unidades = await UnidadService.getAll();
      res.json(unidades);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UnidadService.update(id.toString(), req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UnidadService.toggleStatus(id.toString());
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
