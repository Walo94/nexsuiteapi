import express from "express";
import cors from "cors";

// Importaciones de rutas y controladores

// MP
import categoriaRoutes from "@/routes/mp/CategoriaRoutes";
import unidadRoutes from "@/routes/mp/UnidadRoutes";
import mateterialRoutes from "@/routes/mp/MaterialRoutes";
import proveedorRoutes from "@/routes/mp/ProveedorRoutes";
import listaPrecioRoutes from "@/routes/mp/ListaPrecioRoutes";

// Auth
import authRoutes from "@/routes/admin/AuthRoutes";
import moduloRoutes from "@/routes/admin/ModuloRoutes";


const app = express();
const allowedOrigins = [process.env.FRONTEND_URL];

// Middleware
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

// Rutas de MP
app.use('/nexsuite-api/v1/mp/categorias', categoriaRoutes);
app.use('/nexsuite-api/v1/mp/unidades', unidadRoutes);
app.use('/nexsuite-api/v1/mp/materiales', mateterialRoutes);
app.use('/nexsuite-api/v1/mp/proveedores', proveedorRoutes);
app.use('/nexsuite-api/v1/mp/listas-precios', listaPrecioRoutes);


// Rutas de Auth
app.use('/nexsuite-api/v1/auth', authRoutes)
app.use("/nexsuite-api/v1/modulos", moduloRoutes);

export default app;