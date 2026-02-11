import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    type Relation,
} from "typeorm";
import { ListaPrecio } from "@/entities/mp/ListaPrecio";
import { Material } from "@/entities/mp/Material";

@Entity({ name: "listas_precios_detalle" })
export class ListaPrecioDetalle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int", nullable: false })
    lista_precio_id!: number;

    @ManyToOne(() => ListaPrecio, (lista) => lista.detalles, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "lista_precio_id" })
    lista_precio!: Relation<ListaPrecio>;

    @Column({ type: "varchar", length: 50, nullable: false })
    material_id!: string;

    @ManyToOne(() => Material)
    @JoinColumn({ name: "material_id" })
    material!: Relation<Material>;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    costo!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}