import { SigninInput } from "./SigninInput";
import { IsDateString, Length } from "class-validator";

export class SignupInput extends SigninInput {
  @Length(10, 13)
  phone_number: string;

  @Length(2, 20)
  first_name: string;

  @Length(2, 20)
  last_name: string;

  @IsDateString()
  date_of_birth: Date;

  gender: string;
}
