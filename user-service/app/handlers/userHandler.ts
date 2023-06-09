import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

import { container } from "tsyringe";
import { ErrorMessage } from "../utils/response";
import { UserService } from "../services/userService";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const service = container.resolve(UserService);

export const Signup = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
}).use(jsonBodyParser());

export const Signin = middy((event: APIGatewayProxyEventV2) => {
  return service.SigninUser(event);
}).use(jsonBodyParser());

export const Verify = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toUpperCase();

  if (httpMethod === "GET") {
    return service.GetVerificationToken(event);
  } else if (httpMethod === "POST") {
    return service.VerifyUser(event);
  } else {
    return service.ResponseWithErrors(event);
  }
}).use(jsonBodyParser());

export const Profile = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toUpperCase();

  if (httpMethod === "GET") {
    return service.GetProfile(event);
  } else if (httpMethod === "POST") {
    return service.CreateProfile(event);
  } else if (httpMethod === "PUT") {
    return service.UpdateProfile(event);
  } else {
    return service.ResponseWithErrors(event);
  }
}).use(jsonBodyParser());

export const Cart = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toUpperCase();

  if (httpMethod === "GET") {
    return service.GetCart(event);
  } else if (httpMethod === "POST") {
    return service.CreateCart(event);
  } else if (httpMethod === "PUT") {
    return service.UpdateCart(event);
  } else {
    return service.ResponseWithErrors(event);
  }
}).use(jsonBodyParser());

export const Payment = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toUpperCase();

  if (httpMethod === "GET") {
    return service.GetPaymentMethod(event);
  } else if (httpMethod === "POST") {
    return service.AddPaymentMethod(event);
  } else if (httpMethod === "PUT") {
    return service.UpdatePaymentMethod(event);
  } else {
    return service.ResponseWithErrors(event);
  }
}).use(jsonBodyParser());
