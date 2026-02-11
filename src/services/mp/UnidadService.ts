import { AppDataSource } from "@/config/data-source";
import { Unidad } from "@/entities/mp/Unidad";
import { typeUnidad } from "@/types/mp/Unidad";

const unidadRepo = AppDataSource.getRepository(Unidad);

export const UnidadService = {
  async getAll() {
    return await unidadRepo.find({
      order: { descripcion: "ASC" },
    });
  },

  async create(data: typeUnidad) {
    const nuevaUnidad = unidadRepo.create({
      ...data,
      isActive: true,
    });
    return await unidadRepo.save(nuevaUnidad);
  },

  async update(id: string, data: typeUnidad) {
    const obj = await unidadRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Unidad no encontrada");

    Object.assign(obj, data);
    return await unidadRepo.save(obj);
  },

  async toggleStatus(id: string) {
    const obj = await unidadRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Unidad no encontrada");
    obj.isActive = !obj.isActive;
    return await unidadRepo.save(obj);
  },
};
