import { Request, Response } from "express";
import { Material } from "@/entities/mp/Material";
import { MaterialService } from "@/services/mp/MaterialService";

export const MaterialController = {
    async create(req: Request, res: Response) {
        try {
            const { id, descripcion, unidad_compra_id, unidad_consumo_id, categoria_id, tipo } = req.body;

            if (!id || !descripcion || !unidad_compra_id || !unidad_consumo_id || !categoria_id || !tipo) {
                return res.status(400).json({
                    message: "Todos los campos son requeridos",
                });
            }

            const result = await MaterialService.create(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const materiales = await MaterialService.getAll();
            res.json(materiales);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { descripcion, unidad_compra_id, unidad_consumo_id, categoria_id, tipo } = req.body;

            if (!descripcion || !unidad_compra_id || !unidad_consumo_id || !categoria_id || !tipo) {
                return res.status(400).json({
                    message: "Todos los campos son requeridos",
                });
            }

            const result = await MaterialService.update(id.toString(), req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async toggleStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await MaterialService.toggleStatus(id.toString());
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },
}