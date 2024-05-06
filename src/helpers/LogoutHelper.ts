import { NavigateFunction } from "react-router-dom";
import Token from "../utils/Token";
import { LOGIN } from "../utils/Routes";

export default class LogoutHelper {
  private static navigateFn: NavigateFunction;

  public static logout() {
    // Delete the access token from cookie and refresh token from local storage
    Token.deleteAccessToken();
    Token.deleteRefreshToken();

    // Redirect to login page

    this.navigateFn(LOGIN);
  }

  public static setNavigateFn(navigate: NavigateFunction) {
    this.navigateFn = navigate;
  }
}
