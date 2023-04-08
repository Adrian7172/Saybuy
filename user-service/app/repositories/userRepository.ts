import { dbClient } from "../utils/dbClient";
import { UserModel } from "../models/UserModel";

export class UserRepository {
  constructor() {}

  async CreateUserAccount({
    email,
    phone_number,
    password,
    first_name,
    last_name,
    date_of_birth,
    age,
    user_type,
    salt,
    gender,
  }: UserModel) {
    const client = await dbClient();
    await client.connect();
    const queryString =
      "INSERT INTO users (email, phone_number, password, first_name, last_name, date_of_birth, age, user_type, salt, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const values = [
      email,
      phone_number,
      password,
      first_name,
      last_name,
      date_of_birth,
      age,
      user_type,
      salt,
      gender,
    ];

    const response = await client.query(queryString, values);
    await client.end();

    if (response.rowCount > 0) {
      return response.rows[0] as UserModel;
    }
  }

  async findUserAccount(email: string) {
    const client = await dbClient();
    client.connect();

    const queryString =
      "SELECT user_id, email, password, salt, user_type FROM users WHERE email = $1";
    const values = [email];
    const response = await client.query(queryString, values);
    client.end();

    if (response.rowCount > 0) {
      return response.rows[0];
    }
    return false;
  }
}
