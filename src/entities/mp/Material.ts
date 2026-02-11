import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  type Relation,
} from "typeorm";
import { Unidad } from "@/entities/mp/Unidad";
import { Categoria } from "@/entities/mp/Categoria";

@Entity({ name: "materiales" })
export class Material {
  @PrimaryColumn({ type: "varchar", length: 50 })
  id!: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  descripcion!: string;

  @Column({ type: "varchar", length: 10, nullable: false})
  tipo!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "varchar", length: 50, nullable: false })
  unidad_compra_id!: string;

  @ManyToOne(() => Unidad)
  @JoinColumn({ name: "unidad_compra_id" })
  unidad_compra!: Relation<Unidad>;

  @Column({ type: "varchar", length: 50, nullable: false })
  unidad_consumo_id!: string;

  @ManyToOne(() => Unidad)
  @JoinColumn({ name: "unidad_consumo_id" })
  unidad_consumo!: Relation<Unidad>;

  @Column({ type: "int", nullable: false })
  categoria_id!: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: "categoria_id" })
  categoria!: Relation<Categoria>;

}