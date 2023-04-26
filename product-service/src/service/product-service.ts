import { APIGatewayEvent } from "aws-lambda";

import { ProductRepository } from "../repository/product-repository";
import { plainToClass } from "class-transformer";
import { ProductInput } from "../models/dto/ProductInput";
import { AppValidationError } from "../utility/errors";
import { ErrorMessage, SuccessMessage, SuccessfullyCreated } from "../utility/response";

export class ProductService {
  _repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorMessage(404, "method you requested is not supported!");
  }

  async CreateProduct(event: APIGatewayEvent) {
    try {
      const input = plainToClass(ProductInput, JSON.parse(event.body!));
      const error = await AppValidationError(input);
      if (error) {
        return ErrorMessage(404, error);
      }
      const res = await this._repository.CreateProduct(input);

      return SuccessfullyCreated(res);
    } catch (err) {
      return ErrorMessage(401, "Error with create Product");
    }
  }
  async GetAllProducts(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get all products product",
    });
  }
  async GetProductById(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get product by Id product",
    });
  }
  async UpdateProduct(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from update product",
    });
  }
  async DeleteProduct(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from delete product",
    });
  }
}
