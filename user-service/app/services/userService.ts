import { ErrorMessage, SuccessMessage } from "../utils/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "../repositories/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { AppValidationError } from "../utils/errors";
import { SignupInput } from "../models/dto/SignupInput";
import { genSalt } from "bcrypt";
import { genHashPassword } from "../utils/password";
import { getAge } from "../utils/user";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /* USER SIGN UP */
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) {
        return ErrorMessage(404, error);
      }
      const salt = await genSalt();
      const hashPassword = await genHashPassword(salt, input.password);

      const age = await getAge(input.dateOfBirth);

      const response = await this.repository.CreateUserAccount({
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: hashPassword,
        firstName: input.firstName,
        lastName: input.lastName,
        salt: salt,
        dateOfBirth: input.dateOfBirth,
        age: age,
        userType: "BUYER",
        gender: input.gender,
      });

      return SuccessMessage(response);
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  /* USER SIGN IN */
  async SigninUser(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from signin" });
  }

  /* USER VERIFICATION */
  async VerifyUser(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* CREATE PROFILE */
  async CreateProfile(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from create profile" });
  }

  /* GET PROFILE */
  async GetProfile(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from get profile" });
  }

  /* UPDATE PROFILE */
  async UpdateProfile(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from update profile" });
  }

  /* CREATE CART */
  async CreateCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from create cart" });
  }

  /* GET CART */
  async GetCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from get cart" });
  }

  /* UPDATE CART*/
  async UpdateCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from update cart" });
  }

  /* ADD PAYMENT METHOD */
  async AddPaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from add payment method" });
  }

  /* GET PAYMENT METHOD */
  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from get payment method" });
  }

  /* UPDATE PAYMENT METHOD */
  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from update payment method" });
  }
}
