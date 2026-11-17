import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("title_ratings")
export class TitleRatings {
  @PrimaryColumn({ name: "tconst", type: "integer" })
  tconst!: number;

  @Column({
    name: "average_rating",
    type: "numeric",
    // pg returns `numeric` as a string by default.
    transformer: {
      to: (value: number) => value,
      from: (value: string | null) => (value === null ? null : Number(value)),
    },
  })
  averageRating!: number;

  @Column({ name: "num_votes", type: "integer" })
  numVotes!: number;
}
