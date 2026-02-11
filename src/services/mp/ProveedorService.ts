import { AppDataSource } from "@/config/data-source";
import { Proveedor } from "@/entities/mp/Proveedor";
import { typeProveedor } from "@/types/mp/Proveedor";

const proveedorRepo = AppDataSource.getRepository(Proveedor);

export const ProveedorService = {
  async getAll() {
    return await proveedorRepo.find({
      order: { nombre: "ASC" },
    });
  },

  async create(data: typeProveedor) {
    const nuevoProveedor = proveedorRepo.create({
      ...data,
      isActive: true,
    });
    return await proveedorRepo.save(nuevoProveedor);
  },

  async update(id: number, data: typeProveedor) {
    const obj = await proveedorRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Proveedor no encontrado");

    Object.assign(obj, data);
    return await proveedorRepo.save(obj);
  },

  async toggleStatus(id: number) {
    const obj = await proveedorRepo.findOne({ where: { id } });
    if (!obj) throw new Error("Proveedor no encontrado");
    obj.isActive = !obj.isActive;
    return await proveedorRepo.save(obj);
  },
};
