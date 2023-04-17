// define lambda handler functions

import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("EVENT: ", event);
  console.log("CONTEXT: ", context);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "this is the message from deals service",
      path: `${event.path}, ${event.pathParameters}`,
    }),
  };
};
