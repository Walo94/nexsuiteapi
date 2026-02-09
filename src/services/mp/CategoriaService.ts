import { AppDataSource } from "@/config/data-source";
import { Categoria } from "@/entities/mp/Categoria";

const categoriaRepo = AppDataSource.getRepository(Categoria);

export const CategoriaService = {
  async getAll() {
    return await categoriaRepo.find({
      order: { nombre: "ASC" },
    });
  },

  async create(data: any) {
    const nuevaCategoria = categoriaRepo.create({
      ...data,
      isActive: true,
    });
    return await categoriaRepo.save(nuevaCategoria);
  },

  async update(id: number, data: any) {
    const cat = await categoriaRepo.findOne({ where: { id } });
    if (!cat) throw new Error("Categoría no encontrada");

    Object.assign(cat, data);
    return await categoriaRepo.save(cat);
  },

  async toggleStatus(id: number) {
    const cat = await categoriaRepo.findOne({ where: { id } });
    cat.isActive = !cat.isActive;
    return await categoriaRepo.save(cat);
  },
};
