import { APIGatewayEvent } from "aws-lambda";
import { ErrorMessage, SuccessMessage } from "../utility/response";

export class DealsService {
  constructor() {}

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorMessage(404, "method you requested is not supported!");
  }

  async CreateDeal(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from create deal",
    });
  }
  async GetAllDeals(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get all deals",
    });
  }
  async GetdealById(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from get deal by Id ",
    });
  }
  async UpdateDeal(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from update deal",
    });
  }
  async DeleteDeal(event: APIGatewayEvent) {
    return SuccessMessage({
      message: "this is the message from delete deal",
    });
  }
}
