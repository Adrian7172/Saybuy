import { UserModel } from "../models/UserModel";
import { DbOperation } from "./dbOperations";

export class UserRepository extends DbOperation {
  constructor() {
    super();
  }

  async CreateUserAccount({
    email,
    phone_number,
    password,
    user_type,
    salt,
  }: UserModel) {
    const queryString =
      "INSERT INTO users (email, phone_number, password, user_type, salt) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      email,
      phone_number,
      password,
      user_type,
      salt,
    ];
    const response = await this.executeQuery(queryString, values);
    if (response.rowCount > 0) {
      return response.rows[0] as UserModel;
    }
  }


  async findUserAccount(email: string) {
    const queryString =
      "SELECT user_id, email, password, salt, user_type, phone_number FROM users WHERE email = $1";
    const values = [email];
    const response = await this.executeQuery(queryString, values);

    if (response.rowCount > 0) {
      return response.rows[0];
    }
    return false;
  }
}
