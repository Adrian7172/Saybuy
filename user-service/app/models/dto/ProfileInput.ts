import { IsDateString, IsNumber, Length } from "class-validator";

export class AddressInput {
  address_id?: number;

  @Length(3, 32)
  address_line1: string;

  address_line2: string;

  @Length(4, 6)
  postal_code: number;

  @Length(3, 32)
  city: string;

  @Length(3, 32)
  state: string;

  @Length(2, 3)
  country: string;
}
export class ProfileInput {
  @Length(3, 32)
  first_name: string;

  @Length(3, 32)
  last_name: string;

  @Length(3, 20)
  gender: string;

  age?: number;

  @IsDateString()
  date_of_birth: Date;

  @Length(5, 6)
  user_type: "BUYER" | "SELLER";

  address: AddressInput;
}
