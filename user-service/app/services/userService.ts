import { SuccessMessage } from "../utils/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class UserService {
  constructor() {}

  /* USER SIGN UP */
  async CreateUser(event: APIGatewayProxyEventV2) {
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
    return SuccessMessage({ message: "message from verify user" });
  }

  /* GET PROFILE */
  async GetProfile(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* UPDATE PROFILE */
  async UpdateProfile(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* CREATE CART */
  async CreateCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* GET CART */
  async GetCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* UPDATE CART*/
  async UpdateCart(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* ADD PAYMENT METHOD */
  async AddPaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* GET PAYMENT METHOD */
  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }

  /* UPDATE PAYMENT METHOD */
  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    // business logic
    return SuccessMessage({ message: "message from verify user" });
  }
}
