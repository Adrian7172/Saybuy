export interface UserModel {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: Date;
  age?: number;
  email: string;
  phone_number: string;
  salt: string;
  password: string;
  user_type: "BUYER" | "SELLER";
  gender?: string;
  profile_pic?: string;
  verification_code?: number;
  expiry?: Date;
}
