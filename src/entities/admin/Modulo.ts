import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("modulos")
export class Modulo {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Clave única que mapea 1:1 con el path del frontend.
   * Ejemplos:
   *   "mp"                       → módulo raíz Materia Prima
   *   "mp.materiales"            → sección Materiales
   *   "mp.materiales.categorias" → página /materia-prima/categorias
   *   "ventas"                   → módulo raíz Ventas
   *   "ventas.clientes"          → página /ventas/clientes
   */
  @Column({ type: "varchar", length: 100, unique: true })
  clave!: string;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  /** Ruta frontend equivalente — null si es un nodo padre sin página propia */
  @Column({ type: "varchar", length: 200, nullable: true })
  path!: string | null;

  /** Relación recursiva padre → hijo */
  @ManyToOne(() => Modulo, (m) => m.hijos, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "padre_id" })
  padre!: Modulo | null;

  @Column({ type: "integer", nullable: true })
  padre_id!: number | null;

  @OneToMany(() => Modulo, (m) => m.padre)
  hijos!: Modulo[];

  @Column({ type: "integer", default: 0 })
  orden!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;
}