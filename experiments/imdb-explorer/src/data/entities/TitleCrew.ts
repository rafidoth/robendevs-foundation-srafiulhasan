import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("title_crew")
export class TitleCrew {
  @PrimaryColumn({ name: "tconst", type: "integer" })
  tconst!: number;

  @Column({ name: "directors", type: "integer", array: true, nullable: true })
  directors!: number[] | null;

  @Column({ name: "writers", type: "integer", array: true, nullable: true })
  writers!: number[] | null;
}
