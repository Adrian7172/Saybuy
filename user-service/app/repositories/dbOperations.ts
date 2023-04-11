import { UserModel } from "app/models/UserModel";
import { dbClient } from "../utils/dbClient";

export class DbOperation {
  constructor() {}

  async executeQuery(queryString: string, values: unknown[]) {
    const client = await dbClient();
    await client.connect();
    const result = await client.query(queryString, values);
    await client.end();
    return result;
  }
}
