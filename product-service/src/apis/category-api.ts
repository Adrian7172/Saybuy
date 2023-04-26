// define lambda handler functions

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ProductService } from "../service/product-service";
import { ErrorMessage } from "../utility/response";
import { CategoryService } from "../service/category-service";

const service = new CategoryService();

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const isRoot = event.pathParameters === null;
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      if (isRoot) {
        return service.CreateCategory(event);
      }
      break;
    case "get":
      return isRoot
        ? service.GetAllCategories(event)
        : service.GetCategoryById(event);
    case "put":
      if (!isRoot) return service.UpdateCategory(event);
      break;
    case "delete":
      if (!isRoot) return service.DeleteCategory(event);
      break;
  }
  return service.ResponseWithError(event);
};
