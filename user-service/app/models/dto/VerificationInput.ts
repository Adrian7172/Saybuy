import { Length } from "class-validator";

export class VerificationInput {
  @Length(6, 6)
  verification_code: number;
}
