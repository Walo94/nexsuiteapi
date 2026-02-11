import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    type Relation,
} from "typeorm";
import { Proveedor } from "@/entities/mp/Proveedor";
import { ListaPrecioDetalle } from "@/entities/mp/ListaPrecioDetalle";

@Entity({ name: "listas_precios" })
export class ListaPrecio {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 150, nullable: false })
    descripcion!: string;

    @Column({ type: "int", nullable: false })
    proveedor_id!: number;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: "proveedor_id" })
    proveedor!: Relation<Proveedor>;

    @OneToMany(() => ListaPrecioDetalle, (detalle) => detalle.lista_precio, {
        cascade: true,
    })
    detalles!: Relation<ListaPrecioDetalle[]>;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}