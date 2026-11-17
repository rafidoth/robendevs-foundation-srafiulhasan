import "reflect-metadata";

import { DataSource } from "typeorm";
import { NameBasics } from "./entities/NameBasics.js";
import { TitleAkas } from "./entities/TitleAkas.js";
import { TitleBasics } from "./entities/TitleBasics.js";
import { TitleCrew } from "./entities/TitleCrew.js";
import { TitleEpisode } from "./entities/TitleEpisode.js";
import { TitlePrincipals } from "./entities/TitlePrincipals.js";
import { TitleRatings } from "./entities/TitleRatings.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  username: requireEnv("DB_USER"),
  password: requireEnv("DB_PASSWORD"),
  database: requireEnv("DB_NAME"),
  entities: [
    NameBasics,
    TitleAkas,
    TitleBasics,
    TitleCrew,
    TitleEpisode,
    TitlePrincipals,
    TitleRatings,
  ],
  synchronize: false, 
  logging: ["query", "error"],
});

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    if (!AppDataSource.isInitialized) {
      return false;
    }
    await AppDataSource.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}