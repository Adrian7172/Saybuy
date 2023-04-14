import { SigninInput } from "./SigninInput";
import { Length } from "class-validator";

export class SignupInput extends SigninInput {
  @Length(10, 13)
  phone_number: string;
}
