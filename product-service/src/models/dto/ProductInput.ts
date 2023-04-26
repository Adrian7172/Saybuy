import { IsNumber, Length } from "class-validator";

export class ProductInput {
  @Length(3, 100)
  name: string;

  @Length(3, 256)
  description: string;

  @IsNumber()
  price: number;

}
