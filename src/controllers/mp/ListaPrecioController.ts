import { Request, Response } from "express";
import { ListaPrecioService } from "@/services/mp/ListaPrecioService";

export const ListaPrecioController = {
    async getAll(req: Request, res: Response) {
        try {
            const listas = await ListaPrecioService.getAll();
            res.json(listas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const lista = await ListaPrecioService.getById(Number(id));
            res.json(lista);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    },

    async getByProveedor(req: Request, res: Response) {
        try {
            const { proveedorId } = req.params;
            const listas = await ListaPrecioService.getByProveedor(Number(proveedorId));
            res.json(listas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { descripcion, proveedor_id, materiales } = req.body;

            if (!descripcion || !proveedor_id) {
                return res.status(400).json({
                    message: "La descripción y el proveedor son requeridos",
                });
            }

            // Validar que materiales sea un array si se proporciona
            if (materiales && !Array.isArray(materiales)) {
                return res.status(400).json({
                    message: "Los materiales deben ser un array",
                });
            }

            // Validar estructura de cada material
            if (materiales && materiales.length > 0) {
                for (const mat of materiales) {
                    if (!mat.material_id || mat.costo === undefined) {
                        return res.status(400).json({
                            message: "Cada material debe tener material_id y costo",
                        });
                    }
                }
            }

            const result = await ListaPrecioService.create(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { descripcion, proveedor_id, materiales } = req.body;

            // Validar que al menos un campo esté presente
            if (!descripcion && !proveedor_id && !materiales) {
                return res.status(400).json({
                    message: "Debe proporcionar al menos un campo para actualizar",
                });
            }

            // Validar estructura de materiales si se proporcionan
            if (materiales !== undefined) {
                if (!Array.isArray(materiales)) {
                    return res.status(400).json({
                        message: "Los materiales deben ser un array",
                    });
                }

                for (const mat of materiales) {
                    if (!mat.material_id || mat.costo === undefined) {
                        return res.status(400).json({
                            message: "Cada material debe tener material_id y costo",
                        });
                    }
                }
            }

            const result = await ListaPrecioService.update(Number(id), req.body);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async toggleStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ListaPrecioService.toggleStatus(Number(id));
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ListaPrecioService.delete(Number(id));
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    // Endpoints para gestión de materiales individuales

    async addMaterial(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { material_id, costo } = req.body;

            if (!material_id || costo === undefined) {
                return res.status(400).json({
                    message: "material_id y costo son requeridos",
                });
            }

            const result = await ListaPrecioService.addMaterial(Number(id), {
                material_id,
                costo,
            });
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateMaterial(req: Request, res: Response) {
        try {
            const { id, detalleId } = req.params;
            const { costo } = req.body;

            if (costo === undefined) {
                return res.status(400).json({
                    message: "El costo es requerido",
                });
            }

            const result = await ListaPrecioService.updateMaterial(
                Number(id),
                Number(detalleId),
                costo
            );
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async removeMaterial(req: Request, res: Response) {
        try {
            const { id, detalleId } = req.params;
            const result = await ListaPrecioService.removeMaterial(
                Number(id),
                Number(detalleId)
            );
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },
};