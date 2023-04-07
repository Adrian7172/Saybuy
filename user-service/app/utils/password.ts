import bcrypt from "bcrypt";
export async function genSalt() {
  return await bcrypt.genSalt();
}

export async function genHashPassword(salt: string, password: string) {
  return await bcrypt.hash(password, salt);
}

export async function validatePassword(
  enteredPassword: string,
  savedPassword: string,
  salt: string
) {
  return (await genHashPassword(salt, enteredPassword)) === savedPassword;
}
