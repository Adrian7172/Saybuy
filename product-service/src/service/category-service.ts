import { APIGatewayEvent } from "aws-lambda";
import { ErrorMessage, SuccessMessage } from "../utility/response";


export class CategoryService {
  constructor() {}

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorMessage(404, "method you requested is not supported!");
  }

  async CreateCategory(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from create category",
    });
  }
  async GetAllCategories(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get all products category",
    });
  }
  async GetCategoryById(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get category by Id",
    });
  }
  async UpdateCategory(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from update category",
    });
  }
  async DeleteCategory(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from delete category",
    });
  }
}
