import { Request, Response } from "express";
import { AuthService } from "@/services/admin/AuthService";

export const AuthController = {

  // POST /auth
  async create(req: Request, res: Response) {
    try {
      const { nombre, usuario, password, moduloIds } = req.body;

      if (!nombre || !usuario || !password) {
        return res.status(400).json({ error: "nombre, usuario y password son requeridos" });
      }
      if (!moduloIds || !Array.isArray(moduloIds) || moduloIds.length === 0) {
        return res.status(400).json({ error: "Debes asignar al menos un módulo" });
      }

      const result = await AuthService.create({ nombre, usuario, password, moduloIds });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // POST /auth/login
  async login(req: Request, res: Response) {
    try {
      const { usuario, password } = req.body;

      if (!usuario || !password) {
        return res.status(400).json({ error: "Ingresa el usuario y contraseña" });
      }

      const result = await AuthService.login(usuario, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },

  // GET /auth
  async getAll(req: Request, res: Response) {
    try {
      const result = await AuthService.getAll();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /auth/:id
  async getById(req: Request, res: Response) {
    try {
      const result = await AuthService.getById(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  // GET /auth/perfil - Obtiene el perfil del usuario autenticado
  async getPerfil(req: Request, res: Response) {
    try {
      // El middleware authMiddleware ya validó el token y puso el user en req.user
      const userId = (req as any).user.id;
      
      if (!userId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const result = await AuthService.getPerfil(userId);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  // PUT /auth/:id
  async update(req: Request, res: Response) {
    try {
      const result = await AuthService.update(req.params.id as string, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async toggleStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await AuthService.toggleStatus(id.toString());
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};