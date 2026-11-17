/**
 * PostgreSQL enum types used by the IMDb dataset.
 * The names must match the enum type names in the database
 * (title_type, genre, category), since `synchronize` is off.
 */

export enum TitleType {
  Movie = "movie",
  Short = "short",
  TvSeries = "tvSeries",
  TvMiniSeries = "tvMiniSeries",
  TvMovie = "tvMovie",
  TvSpecial = "tvSpecial",
  TvShort = "tvShort",
  TvEpisode = "tvEpisode",
  Video = "video",
  VideoGame = "videoGame",
}

export enum Genre {
  Action = "Action",
  Adult = "Adult",
  Adventure = "Adventure",
  Animation = "Animation",
  Biography = "Biography",
  Comedy = "Comedy",
  Crime = "Crime",
  Documentary = "Documentary",
  Drama = "Drama",
  Family = "Family",
  Fantasy = "Fantasy",
  FilmNoir = "Film-Noir",
  GameShow = "Game-Show",
  History = "History",
  Horror = "Horror",
  Music = "Music",
  Musical = "Musical",
  Mystery = "Mystery",
  News = "News",
  RealityTv = "Reality-TV",
  Romance = "Romance",
  SciFi = "Sci-Fi",
  Short = "Short",
  Sport = "Sport",
  TalkShow = "Talk-Show",
  Thriller = "Thriller",
  War = "War",
  Western = "Western",
}

export enum PrincipalCategory {
  Actor = "actor",
  Actress = "actress",
  ArchiveFootage = "archive_footage",
  ArchiveSound = "archive_sound",
  CastingDirector = "casting_director",
  Cinematographer = "cinematographer",
  Composer = "composer",
  Director = "director",
  Editor = "editor",
  Producer = "producer",
  ProductionDesigner = "production_designer",
  Self = "self",
  Writer = "writer",
}
