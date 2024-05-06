import { ERROR_TOAST, SUCCESS_TOAST } from "../utils/Constants";

export default class Handler {
  private static responseStatusMap: any = {
    400: ERROR_TOAST,
    500: ERROR_TOAST,
    200: SUCCESS_TOAST,
  };

  private static handleTokenExpiryError() {}

  public static handleError(err: any, displayToast: (message: string, status: string) => void) {
    const errMessage =
      err.response.data.error || "Something went wrong! Please try after sometime.";
    const errStatus = err.response.status;

    if (errStatus === 401 && errMessage.includes("expired")) {
      // Handle token expiry error
    }

    // Display a error toast message
    displayToast(errMessage, this.responseStatusMap[errStatus]);
  }
}
