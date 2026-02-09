import express from "express";
import { createServer } from "http";
import { AppDataSource } from "@/config/data-source.js";
import cors from "cors";

// Importaciones de rutas y controladores
import categoriaRoutes from "@/routes/mp/CategoriaRoutes";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;
const allowedOrigins = [process.env.FRONTEND_URL];

// Configuración de CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

//Rutas
app.use("nexsuite-api/v1/mp/categorias", categoriaRoutes);

// Inicializar base de datos y servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a MySQL con TypeORM");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => console.log("Error al conectar:", error));
