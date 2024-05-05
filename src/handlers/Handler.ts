import { ERROR_TOAST, SUCCESS_TOAST } from "../utils/Constants";

export default class Handler {
  private static responseStatusMap: any = {
    400: ERROR_TOAST,
    200: SUCCESS_TOAST,
  };

  public static handleError(
    { errMsg, errStatus }: { errMsg: string; errStatus: number },
    displayToast: (message: string, status: string) => void
  ) {
    // Display a error toast message
    displayToast(errMsg, this.responseStatusMap[errStatus]);
  }
}
