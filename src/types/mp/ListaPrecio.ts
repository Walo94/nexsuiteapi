export interface MaterialDetalle {
    material_id: string;
    costo: number;
}

export interface CreateListaPrecioData {
    descripcion: string;
    proveedor_id: number;
    materiales: MaterialDetalle[];
}

export interface UpdateListaPrecioData {
    descripcion?: string;
    proveedor_id?: number;
    materiales?: MaterialDetalle[];
}