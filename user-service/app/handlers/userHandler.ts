import { UserService } from "../services/userService";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const service = new UserService();

export const Signup = async (event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
};

export const Signin = async (event: APIGatewayProxyEventV2) => {
  return service.SigninUser(event);
};

export const Verify = async (event: APIGatewayProxyEventV2) => {
  return service.VerifyUser(event);
};

export const Profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "GET") {
    return service.GetProfile(event);
  } else if (httpMethod === "POST") {
    return service.CreateProfile(event);
  } else if (httpMethod === "PUT") {
    return service.UpdateProfile(event);
  }
};

export const Cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "GET") {
    return service.GetCart(event);
  } else if (httpMethod === "POST") {
    return service.CreateCart(event);
  } else if (httpMethod === "PUT") {
    return service.UpdateCart(event);
  }
};

export const Payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "GET") {
    return service.GetPaymentMethod(event);
  } else if (httpMethod === "POST") {
    return service.AddPaymentMethod(event);
  } else if (httpMethod === "PUT") {
    return service.UpdatePaymentMethod(event);
  }
};
