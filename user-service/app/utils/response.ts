export const FormatResponse = (
  statusCode: number,
  message: string,
  data: any
) => {
  if (data) {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message,
        data,
      }),
    };
  } else {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message,
      }),
    };
  }
};

/* GET */
export const SuccessMessage = (data: object) => {
  return FormatResponse(200, "success", data);
};

/* POST */
export const SuccessfullyCreated = (data: object) => {
  return FormatResponse(201, "success", data);
};

/* ERROR */
export const ErrorMessage = (code = 1000, error: any) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const errorMessage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occured";

    return FormatResponse(code, errorMessage, errorMessage);
  }
  return FormatResponse(code, `${error}`, error);
};
