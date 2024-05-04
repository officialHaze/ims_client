import { NavigateFunction } from "react-router-dom";
import Token from "../utils/Token";
import { LOGIN } from "../utils/Routes";

export default class LogoutHelper {
  public static logout(navigate: NavigateFunction) {
    // Delete the access token from cookie and refresh token from local storage
    Token.deleteAccessToken();
    Token.deleteRefreshToken();

    // Redirect to login page
    navigate(LOGIN);
  }
}
