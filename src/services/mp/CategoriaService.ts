import { AppDataSource } from "@/config/data-source";
import { Categoria } from "@/entities/mp/Categoria";
import { typeCategoria } from "@/types/mp/Categoria";

const categoriaRepo = AppDataSource.getRepository(Categoria);

export const CategoriaService = {
  async getAll() {
    return await categoriaRepo.find({
      order: { nombre: "ASC" },
    });
  },

  async create(data: typeCategoria) {
    const nuevaCategoria = categoriaRepo.create({
      ...data,
      isActive: true,
    });
    return await categoriaRepo.save(nuevaCategoria);
  },

  async update(id: number, data: typeCategoria) {
    const obj = await categoriaRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Categoría no encontrada");

    Object.assign(obj, data);
    return await categoriaRepo.save(obj);
  },

  async toggleStatus(id: number) {
    const obj = await categoriaRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Categoría no encontrada");
    obj.isActive = !obj.isActive;
    return await categoriaRepo.save(obj);
  },
};
