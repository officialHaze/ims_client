import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import Handler from "../handlers/Handler";
import RegisterRequestBody from "../interfaces/RegisterRequestBody";
import { SUCCESS_TOAST } from "../utils/Constants";
import { LOGIN } from "../utils/Routes";

export default class RegistrationHelper {
  public static async register(
    regData: RegisterRequestBody,
    toastDisplayer: (message: string, status: string) => void,
    navigateTo: NavigateFunction
  ) {
    // Call the register API
    try {
      const { data } = await axiosInstance.post("/register", regData);
      console.log({ response_after_calling_register_api: data });

      // Display a toast message
      toastDisplayer(data.message, SUCCESS_TOAST);

      // Redirect to the login page
      navigateTo(LOGIN);
    } catch (err: any) {
      console.error(err.response);

      // Handle generic error
      Handler.handleError(err, toastDisplayer);
    }
  }
}
