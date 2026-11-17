import { Column, Entity, PrimaryColumn } from "typeorm";
import { PrincipalCategory } from "./enums.js";

@Entity("title_principals")
export class TitlePrincipals {
  @PrimaryColumn({ name: "tconst", type: "integer" })
  tconst!: number;

  @PrimaryColumn({ name: "ordering", type: "integer" })
  ordering!: number;

  @Column({ name: "nconst", type: "integer", nullable: true })
  nconst!: number | null;

  @Column({ name: "category", type: "enum", enum: PrincipalCategory, enumName: "category", nullable: true })
  category!: PrincipalCategory | null;

  @Column({ name: "job", type: "text", nullable: true })
  job!: string | null;

  @Column({ name: "characters", type: "text", array: true, nullable: true })
  characters!: string[] | null;
}
