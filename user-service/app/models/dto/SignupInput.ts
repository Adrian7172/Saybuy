import { SigninInput } from "./SigninInput";
import { IsDateString, Length } from "class-validator";

export class SignupInput extends SigninInput {
  @Length(10, 13)
  phoneNumber: string;

  @Length(2, 20)
  firstName: string;

  @Length(2, 20)
  lastName: string;

  @IsDateString()
  dateOfBirth: Date;

  gender: string;
}
