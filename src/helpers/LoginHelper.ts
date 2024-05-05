import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import Handler from "../handlers/Handler";
import Token from "../utils/Token";
import { HOME } from "../utils/Routes";

export default class LoginHelper {
  private phone;
  private password;

  private toastDisplayer;

  private navigate: NavigateFunction;

  constructor(
    phone: number,
    password: string,
    toastDisplayer: (message: string, status: string) => void,
    navigate: NavigateFunction
  ) {
    this.phone = phone;
    this.password = password;
    this.toastDisplayer = toastDisplayer;
    this.navigate = navigate;
  }

  public async login() {
    try {
      const { data } = await axiosInstance.post("/login", {
        phone: this.phone,
        password: this.password,
      });
      console.log({ response_after_login: data });

      // Store the access token in cookie
      Token.saveAccessToken(data.accessToken);

      // Store the refresh token
      Token.saveRefreshToken(data.refreshToken);

      // Redirect to home page
      this.navigate(HOME);
    } catch (err: any) {
      console.error(err.response);

      const errStatus = err.response.status;
      if (errStatus === 403) {
        // User is not verified, handle accordingly
        return;
      }

      // Handle generic error
      Handler.handleError({ errMsg: err.response.data.error, errStatus }, this.toastDisplayer);
    }
  }
}