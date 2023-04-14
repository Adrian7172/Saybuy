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
import {
  SignupInput,
  SigninInput,
  VerificationInput,
  ProfileInput,
} from "../models/dto";
import { genSalt } from "bcrypt";
import { genHashPassword, validatePassword } from "../utils/password";
import { getAge, getToken, verifyToken } from "../utils/user";
import {
  generateAccessToken,
  sendVerificationToken,
} from "../utils/notification";
import { timeDifference } from "../utils/verifyExpiryDate";

@autoInjectable()
export class UserService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /* Responses with the error */
  async ResponseWithErrors(event: APIGatewayProxyEventV2) {
    return ErrorMessage(404, "requested method is not supported!");
  }

  /* USER SIGN UP */
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) {
        return ErrorMessage(404, error);
      }

      const user = await this.repository.FindUserAccount(input.email);
      if (user) {
        return ErrorMessage(400, "user with this email already exist.");
      }

      const salt = await genSalt();
      const hashPassword = await genHashPassword(salt, input.password);

      const response = await this.repository.CreateUserAccount({
        email: input.email,
        phone_number: input.phone_number,
        password: hashPassword,
        user_type: "BUYER",
        salt: salt,
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

      //if user exist already
      const user = await this.repository.FindUserAccount(input.email);
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

      // JWT TOKEN
      const token = getToken(user);

      return SuccessMessage({ token });
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  /* USER VERIFICATION */
  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await verifyToken(token);
      if (!payload) {
        return ErrorMessage(403, "authorization failed");
      }

      const { code, expiry } = generateAccessToken();
      await this.repository.UpdateVerificationCode(
        payload.user_id,
        code,
        expiry
      );
      // const response = await sendVerificationToken(code, payload.phone_number);
      return SuccessMessage({
        message: "verification code is send to the mobile number",
      });
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await verifyToken(token);
      if (!payload) return ErrorMessage(403, "authorization failed");

      const input = plainToClass(VerificationInput, event.body);
      const error = await AppValidationError(input);

      if (error) {
        return ErrorMessage(404, error);
      }

      //find the user
      const { verification_code, expiry } =
        await this.repository.FindUserAccount(payload.email);

      const isMatched = Boolean(verification_code == input.verification_code);
      if (isMatched === false) {
        return ErrorMessage(403, "Verification code didn't matched.");
      }
      // check for expiry date
      const currDate = new Date();
      const timeDiff = timeDifference(expiry, currDate, "m");
      console.log(timeDiff);
      if (timeDiff <= 0) {
        return ErrorMessage(403, "Verification code is expired!");
      }
      // update on DB
      await this.repository.UpdateUserVerification(payload.user_id);

      return SuccessMessage({ message: "User Verified!" });
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  /* CREATE PROFILE */
  async CreateProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await verifyToken(token);
      if (!payload) return ErrorMessage(403, "authorization failed!");

      const input = plainToClass(ProfileInput, event.body);
      const error = await AppValidationError(input);
      if (error) {
        return ErrorMessage(404, error);
      }
      input.age = await getAge(input.date_of_birth);
      // store in DB
      const createUser = await this.repository.CreateUserProfile(
        payload.user_id,
        input
      );

      return SuccessMessage({ message: "user profile created successfully!" });
    } catch (err) {
      return ErrorMessage(500, err);
    }
  }

  /* GET PROFILE */
  async GetProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await verifyToken(token);
      if (!payload) return ErrorMessage(403, "authorization failed!");

      const userProfile = await this.repository.GetUserProfile(payload.user_id);

      return SuccessMessage(userProfile);
    } catch (err) {
      return ErrorMessage(500, err);
    }
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
