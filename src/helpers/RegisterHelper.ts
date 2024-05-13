import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import ErrorHandler from "../handlers/ErrorHandler";
import RegisterRequestBody from "../interfaces/RegisterRequestBody";
import { SUCCESS_TOAST } from "../utils/Constants";
import { LOGIN } from "../utils/Routes";

export default class RegistrationHelper {
  private regData: RegisterRequestBody;
  private toastDisplayer: (message: string, status: string) => void;
  private navigateTo: NavigateFunction;

  private errorHandler: ErrorHandler;

  constructor(
    regData: RegisterRequestBody,
    toastDisplayer: (message: string, status: string) => void,
    navigateTo: NavigateFunction
  ) {
    this.regData = regData;
    this.toastDisplayer = toastDisplayer;
    this.navigateTo = navigateTo;

    this.errorHandler = new ErrorHandler(() => this.register(), this.toastDisplayer);
  }

  public async register() {
    // Call the register API
    try {
      const { data } = await axiosInstance.post("/register", this.regData);
      console.log({ response_after_calling_register_api: data });

      // Display a toast message
      this.toastDisplayer(data.message, SUCCESS_TOAST);

      // Redirect to the login page
      this.navigateTo(LOGIN);
    } catch (err: any) {
      console.error(err.response);

      // Handle generic error
      this.errorHandler.handleError(err);
    }
  }
}
