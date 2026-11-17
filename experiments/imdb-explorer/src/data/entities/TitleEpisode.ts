import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("title_episode")
export class TitleEpisode {
  @PrimaryColumn({ name: "tconst", type: "integer" })
  tconst!: number;

  @Column({ name: "parent_tconst", type: "integer" })
  parentTconst!: number;

  @Column({ name: "season_number", type: "integer", nullable: true })
  seasonNumber!: number | null;

  @Column({ name: "episode_number", type: "integer", nullable: true })
  episodeNumber!: number | null;
}
