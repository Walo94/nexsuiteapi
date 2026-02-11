import { AppDataSource } from "@/config/data-source";
import { ListaPrecio } from "@/entities/mp/ListaPrecio";
import { ListaPrecioDetalle } from "@/entities/mp/ListaPrecioDetalle";
import { CreateListaPrecioData, UpdateListaPrecioData, MaterialDetalle } from "@/types/mp/ListaPrecio";

const listaPrecioRepo = AppDataSource.getRepository(ListaPrecio);
const detalleRepo = AppDataSource.getRepository(ListaPrecioDetalle);


export const ListaPrecioService = {
    async getAll() {
        return await listaPrecioRepo.find({
            relations: [
                "proveedor",
                "detalles",
                "detalles.material",
                "detalles.material.unidad_compra",
                "detalles.material.categoria",
            ],
            order: { id: "DESC" },
        });
    },

    async getById(id: number) {
        const lista = await listaPrecioRepo.findOne({
            where: { id },
            relations: [
                "proveedor",
                "detalles",
                "detalles.material",
                "detalles.material.unidad_compra",
                "detalles.material.categoria",
            ],
        });

        if (!lista) throw new Error("Lista de precios no encontrada");
        return lista;
    },

    async create(data: CreateListaPrecioData) {
        // Crear el encabezado
        const nuevaLista = listaPrecioRepo.create({
            descripcion: data.descripcion,
            proveedor_id: data.proveedor_id,
            isActive: true,
        });

        const savedLista = await listaPrecioRepo.save(nuevaLista);

        // Crear los detalles si existen
        if (data.materiales && data.materiales.length > 0) {
            const detalles = data.materiales.map((mat) =>
                detalleRepo.create({
                    lista_precio_id: savedLista.id,
                    material_id: mat.material_id,
                    costo: mat.costo,
                })
            );

            await detalleRepo.save(detalles);
        }

        return this.getById(savedLista.id);
    },

    async update(id: number, data: UpdateListaPrecioData) {
        const lista = await listaPrecioRepo.findOne({ where: { id } });
        if (!lista) throw new Error("Lista de precios no encontrada");

        // Actualizar el encabezado
        if (data.descripcion !== undefined) {
            lista.descripcion = data.descripcion;
        }
        if (data.proveedor_id !== undefined) {
            lista.proveedor_id = data.proveedor_id;
        }

        await listaPrecioRepo.save(lista);

        // Si se envían materiales, reemplazar todos los detalles
        if (data.materiales !== undefined) {
            // Eliminar detalles existentes
            await detalleRepo.delete({ lista_precio_id: id });

            // Crear nuevos detalles
            if (data.materiales.length > 0) {
                const nuevosDetalles = data.materiales.map((mat) =>
                    detalleRepo.create({
                        lista_precio_id: id,
                        material_id: mat.material_id,
                        costo: mat.costo,
                    })
                );

                await detalleRepo.save(nuevosDetalles);
            }
        }

        return this.getById(id);
    },

    async toggleStatus(id: number) {
        const lista = await listaPrecioRepo.findOne({ where: { id } });
        if (!lista) throw new Error("Lista de precios no encontrada");

        lista.isActive = !lista.isActive;
        return await listaPrecioRepo.save(lista);
    },

    async delete(id: number) {
        const lista = await listaPrecioRepo.findOne({ where: { id } });
        if (!lista) throw new Error("Lista de precios no encontrada");

        // Los detalles se eliminan automáticamente por la cascada
        await listaPrecioRepo.remove(lista);
        return { success: true, message: "Lista de precios eliminada correctamente" };
    },

    // Métodos adicionales para gestión de detalles individuales

    async addMaterial(listaId: number, materialData: MaterialDetalle) {
        const lista = await listaPrecioRepo.findOne({ where: { id: listaId } });
        if (!lista) throw new Error("Lista de precios no encontrada");

        // Verificar si el material ya existe en la lista
        const existente = await detalleRepo.findOne({
            where: {
                lista_precio_id: listaId,
                material_id: materialData.material_id,
            },
        });

        if (existente) {
            throw new Error("Este material ya existe en la lista");
        }

        const nuevoDetalle = detalleRepo.create({
            lista_precio_id: listaId,
            material_id: materialData.material_id,
            costo: materialData.costo,
        });

        await detalleRepo.save(nuevoDetalle);
        return this.getById(listaId);
    },

    async updateMaterial(listaId: number, detalleId: number, costo: number) {
        const detalle = await detalleRepo.findOne({
            where: {
                id: detalleId,
                lista_precio_id: listaId,
            },
        });

        if (!detalle) throw new Error("Detalle no encontrado");

        detalle.costo = costo;
        await detalleRepo.save(detalle);
        return this.getById(listaId);
    },

    async removeMaterial(listaId: number, detalleId: number) {
        const detalle = await detalleRepo.findOne({
            where: {
                id: detalleId,
                lista_precio_id: listaId,
            },
        });

        if (!detalle) throw new Error("Detalle no encontrado");

        await detalleRepo.remove(detalle);
        return this.getById(listaId);
    },

    async getByProveedor(proveedorId: number) {
        return await listaPrecioRepo.find({
            where: { proveedor_id: proveedorId },
            relations: [
                "proveedor",
                "detalles",
                "detalles.material",
                "detalles.material.unidad_compra",
                "detalles.material.categoria",
            ],
            order: { id: "DESC" },
        });
    },
};