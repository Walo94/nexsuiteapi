import { AppDataSource } from "@/config/data-source";
import { Usuario } from "@/entities/admin/Usuario";
import { Modulo } from "@/entities/admin/Modulo";
import { UsuarioModulo } from "@/entities/admin/UsuarioModulo";
import { typeCrearUsuario, typeActualizarUsuario } from "@/types/admin/Usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usuarioRepo = AppDataSource.getRepository(Usuario);
const moduloRepo = AppDataSource.getRepository(Modulo);
const usuarioModuloRepo = AppDataSource.getRepository(UsuarioModulo);

export const AuthService = {
    async create(data: typeCrearUsuario) {
        const { nombre, usuario, password, moduloIds } = data;

        // Verificar que el usuario no exista
        const existe = await usuarioRepo.findOne({ where: { usuario } });
        if (existe) throw new Error("El nombre de usuario ya está en uso");

        // Validar que todos los módulos enviados existen
        const modulos = await moduloRepo.findByIds(moduloIds);
        if (modulos.length !== moduloIds.length) {
            throw new Error("Uno o más módulos enviados no existen");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = usuarioRepo.create({
            nombre,
            usuario,
            password: hashedPassword,
            isActive: true,
        });

        const savedUsuario = await usuarioRepo.save(nuevoUsuario);

        // Asignar módulos
        await this._asignarModulos(savedUsuario.id, moduloIds);
        return this._formatUsuario(savedUsuario);
    },

    async login(usuario: string, password: string) {
        const us = await usuarioRepo
            .createQueryBuilder("u")
            .addSelect("u.password")
            .where("u.usuario = :usuario", { usuario })
            .andWhere("u.isActive = true")
            .getOne();

        if (!us) throw new Error("Usuario no encontrado");

        const isMatch = await bcrypt.compare(password, us.password);
        if (!isMatch) throw new Error("Datos incorrectos");

        const token = jwt.sign(
            { id: us.id, usuario: us.usuario },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        // Obtener módulos permitidos para construir el menú en el frontend
        const modulos = await this.getModulosPermitidos(us.id);

        return {
            usuario: this._formatUsuario(us),
            token,
            modulos, // El frontend usa esto para filtrar el sidebar
        };
    },

    async getAll() {
        const usuarios = await usuarioRepo.find({
            order: { createdAt: "DESC" },
        });

        // Adjuntar módulos a cada usuario
        const result = await Promise.all(
            usuarios.map(async (u) => ({
                ...this._formatUsuario(u),
                modulos: await this.getModulosPermitidos(u.id),
            }))
        );

        return result;
    },

    async getById(id: string) {
        const us = await usuarioRepo.findOne({ where: { id } });
        if (!us) throw new Error("Usuario no encontrado");

        return {
            ...this._formatUsuario(us),
            modulos: await this.getModulosPermitidos(id),
        };
    },

    async getPerfil(id: string){
        const us = await usuarioRepo.findOne({ where: { id } });
        if (!us) throw new Error("Usuario no encontrado");

        return {
            ...this._formatUsuario(us),
            modulos: await this.getModulosPermitidos(id),
        };
    },

    async update(id: string, data: typeActualizarUsuario) {
        const us = await usuarioRepo.findOne({ where: { id } });
        if (!us) throw new Error("Usuario no encontrado");

        // Verificar usuario único si se cambia
        if (data.usuario && data.usuario !== us.usuario) {
            const existe = await usuarioRepo.findOne({ where: { usuario: data.usuario } });
            if (existe) throw new Error("El nombre de usuario ya está en uso");
        }

        // Actualizar campos del usuario
        if (data.nombre) us.nombre = data.nombre;
        if (data.usuario) us.usuario = data.usuario;
        if (data.isActive !== undefined) us.isActive = data.isActive;
        if (data.password) {
            us.password = await bcrypt.hash(data.password, 10);
        }

        await usuarioRepo.save(us);

        // Si se envían módulos, reemplazar los permisos actuales completamente
        if (data.moduloIds !== undefined) {
            const modulos = await moduloRepo.findByIds(data.moduloIds);
            if (modulos.length !== data.moduloIds.length) {
                throw new Error("Uno o más módulos enviados no existen");
            }
            // Borrar permisos actuales y reasignar
            await usuarioModuloRepo.delete({ usuario_id: id });
            await this._asignarModulos(id, data.moduloIds);
        }

        return this.getById(id);
    },

    async getModulosPermitidos(usuarioId: string): Promise<string[]> {
        const registros = await usuarioModuloRepo.find({
            where: { usuario_id: usuarioId },
            relations: ["modulo"],
        });

        // Devolvemos las claves — el frontend las compara contra su Menuconfig
        return registros.map((r) => r.modulo.clave);
    },

    async toggleStatus(id: string) {
        const obj = await usuarioRepo.findOne({ where: { id } });
        if (!obj) throw new Error("Usuario no encontrado");
        obj.isActive = !obj.isActive;
        return await usuarioRepo.save(obj);
    },

    /** Crea los registros en usuario_modulos */
    async _asignarModulos(usuarioId: string, moduloIds: number[]) {
        const registros = moduloIds.map((moduloId) =>
            usuarioModuloRepo.create({ usuario_id: usuarioId, modulo_id: moduloId })
        );
        await usuarioModuloRepo.save(registros);
    },

    /** Retorna el usuario sin el campo password */
    _formatUsuario(u: Usuario) {
        return {
            id: u.id,
            nombre: u.nombre,
            usuario: u.usuario,
            isActive: u.isActive,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
        };
    },
}