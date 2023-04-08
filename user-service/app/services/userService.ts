import {
  ErrorMessage,
  SuccessMessage,
  SuccessfullyCreated,
} from "../utils/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "../repositories/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { AppValidationError } from "../utils/errors";
import { SignupInput, SigninInput } from "../models/dto";
import { genSalt } from "bcrypt";
import { genHashPassword, validatePassword } from "../utils/password";
import { getAge, getToken } from "../utils/user";

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

      const user = await this.repository.findUserAccount(input.email);
      if (user) {
        return ErrorMessage(400, "user with this email already exist.");
      }

      const salt = await genSalt();
      const hashPassword = await genHashPassword(salt, input.password);

      const age = await getAge(input.date_of_birth);

      const response = await this.repository.CreateUserAccount({
        email: input.email,
        phone_number: input.phone_number,
        password: hashPassword,
        first_name: input.first_name,
        last_name: input.last_name,
        date_of_birth: input.date_of_birth,
        age: age,
        user_type: "BUYER",
        salt: salt,
        gender: input.gender,
      });

      return SuccessfullyCreated(response);
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  /* USER SIGN IN */
  async SigninUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SigninInput, event.body);
      const error = await AppValidationError(input);

      if (error) {
        return ErrorMessage(404, error);
      }

      const user = await this.repository.findUserAccount(input.email);
      if (!user) {
        return ErrorMessage(400, "user doesn't exist!");
      }

      const isValidUser = await validatePassword(
        input.password,
        user.password,
        user.salt
      );

      if (!isValidUser) {
        return ErrorMessage(400, "password doesn't match!");
      }

      /* make db and every word right */

      // JWT TOKEN
      // const token = getToken({
      //   userId: user.user_id,
      //   password: user.password,
      //   email: user.email,
      //   userType: user.user_type,
      // });

      return SuccessMessage(user);
    } catch (err) {
      return ErrorMessage(500, err);
    }
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
