import { AppDataSource } from "@/config/data-source";
import { Modulo } from "@/entities/admin/Modulo";

/**
 * Seed de módulos — mantener sincronizado con Menuconfig.ts del frontend.
 * La clave sigue el patrón: <modulo_raiz>.<seccion>.<pagina>
 * El path debe coincidir exactamente con las rutas de React Router.
 */
export async function seedModulos() {
  const repo = AppDataSource.getRepository(Modulo);

  const modulos = [
    // ── Materia Prima ─────────────────────────────────────────
    { id: 1,  clave: "mp",                        nombre: "Materia Prima",   path: "/materia-prima",              padre_id: null, orden: 1 },

    // Secciones (nodos intermedios con hijos)
    { id: 2,  clave: "mp.materiales",             nombre: "Materiales",      path: null,                          padre_id: 1,    orden: 1 },
    { id: 3,  clave: "mp.compras",                nombre: "Compras",         path: "/materia-prima/compras",      padre_id: 1,    orden: 2 },
    { id: 4,  clave: "mp.inventario",             nombre: "Inventario",      path: "/materia-prima/inventario",   padre_id: 1,    orden: 3 },
    { id: 5,  clave: "mp.proveedores",            nombre: "Proveedores",     path: "/materia-prima/proveedores",  padre_id: 1,    orden: 4 },
    { id: 6,  clave: "mp.almacenes",              nombre: "Almacenes",       path: "/materia-prima/almacenes",    padre_id: 1,    orden: 5 },
    { id: 7,  clave: "mp.movimientos",            nombre: "Movimientos",     path: "/materia-prima/movimientos",  padre_id: 1,    orden: 6 },

    // Hijos de Materiales
    { id: 10, clave: "mp.materiales.lista",       nombre: "Materiales",      path: "/materia-prima/materiales",   padre_id: 2,    orden: 1 },
    { id: 11, clave: "mp.materiales.categorias",  nombre: "Categorías",      path: "/materia-prima/categorias",   padre_id: 2,    orden: 2 },
    { id: 12, clave: "mp.materiales.unidades",    nombre: "Unidades",        path: "/materia-prima/unidades",     padre_id: 2,    orden: 3 },
    { id: 13, clave: "mp.materiales.precios",     nombre: "Listas Precios",  path: "/materia-prima/listas-precios", padre_id: 2, orden: 4 },

    // ── Ventas ────────────────────────────────────────────────
    { id: 20, clave: "configuracion",             nombre: "Configuración",   path: "/configuracion",              padre_id: null, orden: 2 },
    { id: 21, clave: "configuracion.usuarios",    nombre: "Usuarios",        path: "/configuracion/usuarios",     padre_id: 20,   orden: 1 },
  ];

  for (const data of modulos) {
    const existe = await repo.findOne({ where: { clave: data.clave } });
    if (!existe) {
      await repo.save(repo.create(data));
    }
  }

  console.log("✅ Módulos seeded correctamente");
}