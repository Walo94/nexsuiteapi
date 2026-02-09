import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "@/entities/mp/Categoria";
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
  entities: [Categoria],
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
