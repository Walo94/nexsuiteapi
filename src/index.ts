import { createServer } from "http";
import { AppDataSource } from "@/config/data-source.js";
import app from '@/app';

const httpServer = createServer(app);
const PORT = process.env.PORT;


// Inicializar base de datos y servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a MySQL con TypeORM");
    

    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => console.log("Error al conectar:", error));
