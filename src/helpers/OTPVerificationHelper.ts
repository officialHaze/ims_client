import Handler from "../handlers/Handler";
import axiosInstance from "../axiosConfig";
import { SUCCESS_TOAST } from "../utils/Constants";

interface Options {
  toastDisplayer: (message: string, status: string) => void;
  isOtpVerificationNeeded: React.Dispatch<React.SetStateAction<boolean>>;
  relogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default class OTPVerificationHelper {
  public static async verify(
    digit1: number,
    digit2: number,
    digit3: number,
    digit4: number,
    digit5: number,
    digit6: number,
    { ...options }: Options
  ) {
    // Concat all the digits into one integer
    let actualOtp = parseInt(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`);

    try {
      const { data } = await axiosInstance.put("/otp-verification", { otp: actualOtp });
      console.log({ otp_verification_api_response: data });

      // Display a success toast
      options.toastDisplayer("Successfully verified", SUCCESS_TOAST);

      // Re-login
      options.relogin(true); // Once the user is verified, re-login

      options.isOtpVerificationNeeded(false); // Set the otp verification needed status to false, once verified
    } catch (err: any) {
      console.error(err.response);

      const errStatus = err.response.status;

      // Handle generic error
      Handler.handleError({ errMsg: err.response.data.error, errStatus }, options.toastDisplayer);
    }
  }
}
