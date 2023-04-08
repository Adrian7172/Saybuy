import { UserModel } from "app/models/UserModel";
import jwt from "jsonwebtoken";

const APP_SECRET = "MY_VERY_SECRET_KEY";

export function getToken({ user_id, email, password, user_type }: UserModel) {
  return jwt.sign({ user_id, password, email, user_type }, APP_SECRET, {
    expiresIn: "30d",
  });
}

export async function getAge(dateOfBirth: Date) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
