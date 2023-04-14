import { AddressModel } from "../models/AddressModel";
import { ProfileInput } from "../models/dto";
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
    throw new Error("error while creating user!");
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
    throw new Error("error while updating verification code!");
  }

  async UpdateUserVerification(user_id: number) {
    const queryString =
      "UPDATE users SET is_verified = true WHERE user_id=$1 RETURNING *";
    const values = [user_id];
    const response = await this.executeQuery(queryString, values);
    if (response.rowCount > 0) {
      return response.rows[0];
    }
    throw new Error("error while updating user!");
  }

  async UpdateUserProfile(
    user_id: number,
    first_name: string,
    last_name: string,
    age: number,
    date_of_birth: Date,
    gender: string,
    user_type: string
  ) {
    const queryString =
      "UPDATE users SET first_name=$1, last_name=$2, age=$3, date_of_birth=$4, gender=$5, user_type=$6 WHERE user_id=$7 RETURNING *";
    const values = [
      first_name,
      last_name,
      age,
      date_of_birth,
      gender,
      user_type,
      user_id,
    ];
    const response = await this.executeQuery(queryString, values);

    if (response.rowCount > 0) {
      return response.rows[0];
    }
    throw new Error("error while updating user profile!");
  }

  async CreateUserProfile(
    user_id: number,
    {
      first_name,
      last_name,
      age,
      date_of_birth,
      gender,
      user_type,
      address: {
        address_line1,
        address_line2,
        postal_code,
        city,
        state,
        country,
      },
    }: ProfileInput
  ) {
    await this.UpdateUserProfile(
      user_id,
      first_name,
      last_name,
      age,
      date_of_birth,
      gender,
      user_type
    );

    // add address
    const queryString =
      "INSERT INTO address (user_id, address_line1, address_line2, postal_code, city, state, country) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      user_id,
      address_line1,
      address_line2,
      postal_code,
      city,
      state,
      country,
    ];

    const updateAddress = await this.executeQuery(queryString, values);

    if (updateAddress.rowCount > 0) {
      return updateAddress.rows[0] as AddressModel;
    }
    throw new Error("error while updating user profile!");
  }

  async GetUserProfile(user_id: number) {
    const profileQuery =
      "SELECT user_id, first_name, last_name, date_of_birth, age, email, phone_number, user_type, gender, profile_pic FROM users WHERE user_id = $1";
    const profileValues = [user_id];
    const profileResult = await this.executeQuery(profileQuery, profileValues);

    if (profileResult.rowCount < 1) {
      throw new Error("user doesn't exist!");
    }
    const userProfile = profileResult.rows[0] as UserModel;

    // address
    const addressQuery =
      "SELECT address_id, address_line1, address_line2, postal_code, city, state, country FROM address WHERE user_id = $1";
    const addressValues = [user_id];
    const addressResult = await this.executeQuery(addressQuery, addressValues);

    if (addressResult.rowCount > 0) {
      userProfile.address = addressResult.rows as AddressModel[];
      return userProfile;
    }
    return userProfile;
  }

  async EditUserProfile(
    user_id: number,
    {
      first_name,
      last_name,
      age,
      date_of_birth,
      gender,
      user_type,
      address: {
        address_id,
        address_line1,
        address_line2,
        postal_code,
        city,
        state,
        country,
      },
    }: ProfileInput
  ) {
    await this.UpdateUserProfile(
      user_id,
      first_name,
      last_name,
      age,
      date_of_birth,
      gender,
      user_type
    );

    // add address
    const queryString =
      "UPDATE address SET address_line1=$1, address_line2=$2, postal_code=$3, city=$4, state=$5, country=$6 WHERE address_id=$7 RETURNING *";
    const values = [
      address_line1,
      address_line2,
      postal_code,
      city,
      state,
      country,
      address_id,
    ];

    const updatedAddress = await this.executeQuery(queryString, values);

    if (updatedAddress.rowCount < 1) {
      throw new Error("error while updating user profile!");
    }
    return true;
  }
}
