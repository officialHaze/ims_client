import ErrorHandler from "../handlers/ErrorHandler";
import axiosInstance from "../axiosConfig";
import { SUCCESS_TOAST } from "../utils/Constants";

interface Options {
  toastDisplayer: (message: string, status: string) => void;
  isOtpVerificationNeeded: React.Dispatch<React.SetStateAction<boolean>>;
  relogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default class OTPVerificationHelper {
  private options: Options;
  private digit1: number;
  private digit2: number;
  private digit3: number;
  private digit4: number;
  private digit5: number;
  private digit6: number;

  private errorHandler: ErrorHandler;

  constructor(
    digit1: number,
    digit2: number,
    digit3: number,
    digit4: number,
    digit5: number,
    digit6: number,
    { ...options }: Options
  ) {
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.digit3 = digit3;
    this.digit4 = digit4;
    this.digit5 = digit5;
    this.digit6 = digit6;
    this.options = options;

    this.errorHandler = new ErrorHandler(() => this.verify(), this.options.toastDisplayer);
  }

  public async verify() {
    // Concat all the digits into one integer
    let actualOtp = parseInt(
      `${this.digit1}${this.digit2}${this.digit3}${this.digit4}${this.digit5}${this.digit6}`
    );

    try {
      const { data } = await axiosInstance.put("/otp-verification", { otp: actualOtp });
      console.log({ otp_verification_api_response: data });

      // Display a success toast
      this.options.toastDisplayer("Successfully verified", SUCCESS_TOAST);

      // Re-login
      this.options.relogin(true); // Once the user is verified, re-login

      this.options.isOtpVerificationNeeded(false); // Set the otp verification needed status to false, once verified
    } catch (err: any) {
      console.error(err.response);

      // Handle generic error
      this.errorHandler.handleError(err);
    }
  }
}
