import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("name_basics")
export class NameBasics {
  @PrimaryColumn({ name: "nconst", type: "integer" })
  nconst!: number;

  @Column({ name: "primary_name", type: "text", nullable: true })
  primaryName!: string | null;

  @Column({ name: "birth_year", type: "integer", nullable: true })
  birthYear!: number | null;

  @Column({ name: "death_year", type: "integer", nullable: true })
  deathYear!: number | null;

  @Column({ name: "primary_profession", type: "text", array: true, nullable: true })
  primaryProfession!: string[] | null;

  @Column({ name: "known_for_titles", type: "integer", array: true, nullable: true })
  knownForTitles!: number[] | null;
}
