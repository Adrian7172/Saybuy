// define lambda handler functions

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "this is the message from product service",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
};
