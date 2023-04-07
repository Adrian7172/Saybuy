export interface UserModel {
  userId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: number;
  email: string;
  phoneNumber: string;
  salt: string;
  password: string;
  userType: "BUYER" | "SELLER";
  gender: string;
}
