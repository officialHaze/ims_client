import axiosInstance from "../axiosConfig";
import LogoutHelper from "../helpers/LogoutHelper";
import { ERROR_TOAST, REFRESH_TOKEN, SUCCESS_TOAST } from "../utils/Constants";
import Token from "../utils/Token";

export default class Handler {
  private static responseStatusMap: any = {
    400: ERROR_TOAST,
    500: ERROR_TOAST,
    200: SUCCESS_TOAST,
  };

  private static async handleTokenExpiryError() {
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

  public static handleError(err: any, displayToast: (message: string, status: string) => void) {
    const errMessage =
      err.response.data.error || "Something went wrong! Please try after sometime.";
    const errStatus = err.response.status;

    if (errStatus === 401 && errMessage.toLowerCase().includes("expired")) {
      // Handle token expiry error
      return this.handleTokenExpiryError();
    }

    // Display a error toast message
    displayToast(errMessage, this.responseStatusMap[errStatus]);
  }
}
