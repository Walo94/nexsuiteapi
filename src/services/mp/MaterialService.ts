import { AppDataSource } from "@/config/data-source";
import { Material } from "@/entities/mp/Material";
import { typeMaterial } from "@/types/mp/Material";


const materialRepo = AppDataSource.getRepository(Material);

export const MaterialService = {
    async getAll() {
        return await materialRepo.find({
            relations: [
                "unidad_compra",
                "unidad_consumo",
                "categoria",
            ],
            order: { descripcion: "ASC" },
        });
    },

    async create(data: typeMaterial) {
        const id = data.id;
        const obj = await materialRepo.findOne({ where: { id } });
        if (obj) throw new Error("Esta clave de material ya existe!");

        const nuevoMaterial = materialRepo.create({
            id: data.id,
            descripcion: data.descripcion,
            unidad_compra_id: data.unidad_compra_id,
            unidad_consumo_id: data.unidad_consumo_id,
            categoria_id: data.categoria_id,
            tipo: data.tipo,
            isActive: true,
        });

        const savedMat = await materialRepo.save(nuevoMaterial);
        return this.getById(savedMat.id);
    },

    async getById(id: string) {
        const mat = await materialRepo.findOne({
            where: { id },
            relations: [
                "unidad_compra",
                "unidad_consumo",
                "categoria",
            ],
        });
        if (!mat) throw new Error("Material no encontrado");
        return mat;
    },

    async update(id: string, data: typeMaterial) {
        const obj = await materialRepo.findOne({ where: { id } });

        if (!obj) throw new Error("Material no encontrado");

        Object.assign(obj, data);
        await materialRepo.save(obj);
        return this.getById(id);
    },

    async toggleStatus(id: string) {
        const obj = await materialRepo.findOne({ where: { id } });
        if (!obj) throw new Error("Material no encontrado");
        obj.isActive = !obj.isActive;
        return await materialRepo.save(obj);
    },
}