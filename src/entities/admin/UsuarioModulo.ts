import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from "typeorm";
import { Usuario } from "@/entities/admin/Usuario";
import { Modulo } from "@/entities/admin/Modulo";

@Entity("usuario_modulos")
@Unique(["usuario_id", "modulo_id"])
export class UsuarioModulo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @Column({ type: "varchar" })
  usuario_id!: string;

  @ManyToOne(() => Modulo, { onDelete: "CASCADE" })
  @JoinColumn({ name: "modulo_id" })
  modulo!: Modulo;

  @Column({ type: "integer" })
  modulo_id!: number;

  @CreateDateColumn()
  asignado_en!: Date;
}