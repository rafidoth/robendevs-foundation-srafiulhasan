import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("title_akas")
export class TitleAkas {
  @PrimaryColumn({ name: "title_id", type: "integer" })
  titleId!: number;

  @PrimaryColumn({ name: "ordering", type: "integer" })
  ordering!: number;

  @Column({ name: "title", type: "text" })
  title!: string;

  @Column({ name: "region", type: "varchar", length: 4, nullable: true })
  region!: string | null;

  @Column({ name: "language", type: "varchar", length: 3, nullable: true })
  language!: string | null;

  @Column({ name: "types", type: "text", array: true, nullable: true })
  types!: string[] | null;

  @Column({ name: "attributes", type: "text", array: true, nullable: true })
  attributes!: string[] | null;

  @Column({ name: "is_original_title", type: "boolean" })
  isOriginalTitle!: boolean;
}
