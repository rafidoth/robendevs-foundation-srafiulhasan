import { Column, Entity, PrimaryColumn } from "typeorm";
import { Genre, TitleType } from "./enums.js";

@Entity("title_basics")
export class TitleBasics {
  @PrimaryColumn({ name: "tconst", type: "integer" })
  tconst!: number;

  @Column({ name: "title_type", type: "enum", enum: TitleType, enumName: "title_type" })
  titleType!: TitleType;

  @Column({ name: "primary_title", type: "text" })
  primaryTitle!: string;

  @Column({ name: "original_title", type: "text" })
  originalTitle!: string;

  @Column({ name: "is_adult", type: "boolean" })
  isAdult!: boolean;

  @Column({ name: "start_year", type: "integer", nullable: true })
  startYear!: number | null;

  @Column({ name: "end_year", type: "integer", nullable: true })
  endYear!: number | null;

  @Column({ name: "runtime_minutes", type: "integer", nullable: true })
  runtimeMinutes!: number | null;

  @Column({ name: "genres", type: "enum", enum: Genre, enumName: "genre", array: true, nullable: true })
  genres!: Genre[] | null;
}
