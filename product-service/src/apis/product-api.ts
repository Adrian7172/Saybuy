// define lambda handler functions
import "../utility";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ProductService } from "../service/product-service";
import { ProductRepository } from "../repository/product-repository";

const service = new ProductService(new ProductRepository());

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const isRoot = event.pathParameters === null;
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      if (isRoot) {
        return service.CreateProduct(event);
      }
      break;
    case "get":
      return isRoot
        ? service.GetAllProducts(event)
        : service.GetProductById(event);
    case "put":
      if (!isRoot) return service.UpdateProduct(event);
      break;
    case "delete":
      if (!isRoot) return service.DeleteProduct(event);
      break;
  }
  return service.ResponseWithError(event);
};
