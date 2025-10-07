import { showFailureToast } from "@raycast/utils";
import { isPaynowError } from "./is-paynow-error";
import z, { ZodError } from "zod";

export const showPaynowError = async (error: unknown) => {
  if (isPaynowError(error)) {
    return showFailureToast(error, {
      title: `PayNow Error ${error.status}`,
      message: error.message,
    });
  }
  if (error instanceof ZodError) {
    return showFailureToast("Validation Error", {
      title: "Validation Error",
      message: z.prettifyError(error),
    });
  }

  console.error(error);
  if (error instanceof Error) {
    return showFailureToast(error, {
      title: "Error",
      message: error.message,
    });
  }
  return showFailureToast("An unknown error occurred");
};
