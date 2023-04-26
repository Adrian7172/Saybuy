// define lambda handler functions

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DealsService } from "../service/deals-service";

const service = new DealsService();
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const isRoot = event.pathParameters === null;
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      return service.CreateDeal(event);
      break;
    case "get":
      return isRoot ? service.GetAllDeals(event) : service.GetdealById(event);
      break;
    case "put":
      if (!isRoot) service.UpdateDeal(event);
      break;
    case "delete":
      if (!isRoot) service.DeleteDeal(event);
      break;
  }
  return service.ResponseWithError(event);
};
