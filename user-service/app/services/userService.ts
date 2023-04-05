import { SuccessMessage } from "../utils/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "../repositories/userRepository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  /* USER SIGN UP */
  async CreateUser(event: APIGatewayProxyEventV2) {
    const body = event.body;
    console.log(body);
    // business logic
    return SuccessMessage({ message: "message from signup" });
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
