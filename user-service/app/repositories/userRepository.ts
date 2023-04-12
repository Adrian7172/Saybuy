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
    const values = [email, phone_number, password, user_type, salt];
    const response = await this.executeQuery(queryString, values);
    if (response.rowCount > 0) {
      return response.rows[0] as UserModel;
    }
  }

  async FindUserAccount(email: string) {
    const queryString =
      "SELECT user_id, email, password, salt, user_type, phone_number, verification_code, expiry FROM users WHERE email = $1";
    const values = [email];
    const response = await this.executeQuery(queryString, values);

    if (response.rowCount > 0) {
      return response.rows[0];
    }
    return false;
  }

  async UpdateVerificationCode(user_id: number, code: number, expiry: Date) {
    const queryString =
      "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 RETURNING *";
    const values = [code, expiry, user_id];
    const response = await this.executeQuery(queryString, values);
    if (response.rowCount > 0) {
      return response.rows[0];
    }
  }

  async UpdateUserVerification(user_id: number) {
    const queryString =
      "UPDATE users SET is_verified = true WHERE user_id=$1 RETURNING *";
    const values = [user_id];
    const response = await this.executeQuery(queryString, values);
    if (response.rowCount > 0) {
      return response.rows[0];
    }
  }
}
