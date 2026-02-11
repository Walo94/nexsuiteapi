
export interface typeUsuario {
    id: string;
    nombre: string;
    usuario: string;
    password: string;
}

/** IDs de módulos que se asignan al crear o actualizar un usuario */
export interface typeCrearUsuario {
  nombre: string;
  usuario: string;
  password: string;
  moduloIds: number[]; // ej: [2, 10, 11, 12] → acceso a Materiales y sus hijos
}

export interface typeActualizarUsuario {
  nombre?: string;
  usuario?: string;
  password?: string;
  isActive?: boolean;
  moduloIds?: number[]; // Si se envía, reemplaza todos los permisos actuales
}