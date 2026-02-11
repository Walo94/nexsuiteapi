import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "@/entities/mp/Categoria";
import { Unidad } from "@/entities/mp/Unidad";
import { Material } from "@/entities/mp/Material";
import { Proveedor } from "@/entities/mp/Proveedor";
import { ListaPrecio } from "@/entities/mp/ListaPrecio";
import { ListaPrecioDetalle } from "@/entities/mp/ListaPrecioDetalle";
import { Usuario } from "@/entities/admin/Usuario";
import { Modulo } from "@/entities/admin/Modulo";
import { UsuarioModulo } from "@/entities/admin/UsuarioModulo";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  connectorPackage: "mysql2",
  synchronize: true,
  logging: false,
  entities: [Categoria, Unidad, Material, Proveedor, ListaPrecio, ListaPrecioDetalle, Usuario, UsuarioModulo, Modulo],
  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
