import axiosInstance from "../axiosConfig";
import LogoutHelper from "../helpers/LogoutHelper";
import { ERROR_TOAST, REFRESH_TOKEN, SUCCESS_TOAST } from "../utils/Constants";
import Token from "../utils/Token";

export default class ErrorHandler {
  private responseStatusMap: any = {
    400: ERROR_TOAST,
    500: ERROR_TOAST,
    200: SUCCESS_TOAST,
  };

  private queryFn: (() => void) | null;
  private toastDisplayer: (message: string, status: string) => void;

  private pollCount = 0;

  constructor(
    queryFn: (() => void) | null,
    toastDisplayer: (message: string, status: string) => void
  ) {
    this.queryFn = queryFn;
    this.toastDisplayer = toastDisplayer;
    // this.pollCount = pollCount;
  }

  private async handleTokenExpiryError() {
    try {
      // Get the cached refresh token from local storage
      const oldRefreshToken = localStorage.getItem(REFRESH_TOKEN);
      // Call the API to refresh the tokens
      const { data } = await axiosInstance.post("/token-refresh", {
        refresh_token: oldRefreshToken,
      });
      console.log({ response_after_refreshing_tokens: data });

      // Save the new sets of access and refresh token
      Token.saveAccessToken(data.accessToken);
      Token.saveRefreshToken(data.refreshToken);
    } catch (err) {
      // Logout user
      LogoutHelper.logout();
    }
  }

  public handleError(err: any) {
    console.error(err);
    const errMessage =
      err.response.data.error || "Something went wrong! Please try after sometime.";
    const errStatus = err.response.status;

    if (errStatus === 401 && errMessage.toLowerCase().includes("expired")) {
      // Handle token expiry error
      this.handleTokenExpiryError();
    }

    if (this.queryFn) {
      if (this.pollCount <= 4) {
        this.pollCount++;
        setTimeout(() => {
          this.queryFn && this.queryFn();
        }, 1000);
      } else {
        // Display a error toast message
        this.toastDisplayer(errMessage, this.responseStatusMap[errStatus]);
        this.pollCount = 0; // Reset
      }
    }
  }
}
