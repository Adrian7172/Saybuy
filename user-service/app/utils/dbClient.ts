import { Client } from "pg";

export const dbClient = () => {
  return new Client({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "user-service",
    port: 5432,
  });
};
