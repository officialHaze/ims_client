import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ERROR_TOAST, OTP_INPUT } from "../../utils/Constants";
import VerifyButton from "../buttons/VerifyButton";
import { ToastContext } from "../../App";
import OTPVerificationHelper from "../../helpers/OTPVerificationHelper";

interface Props extends React.HTMLProps<HTMLElement> {
  isOtpVerificationNeeded: React.Dispatch<React.SetStateAction<boolean>>;
  relogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const noOfInputBoxes = [1, 2, 3, 4, 5, 6];

export default function OTPVerificationForm({
  className,
  isOtpVerificationNeeded,
  relogin,
}: Props) {
  const [otpDigit, setOtpDigit] = useState<any>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case `${OTP_INPUT}_1`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            1: parseInt(value),
          });
        break;

      case `${OTP_INPUT}_2`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            2: parseInt(value),
          });
        break;

      case `${OTP_INPUT}_3`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            3: parseInt(value),
          });
        break;

      case `${OTP_INPUT}_4`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            4: parseInt(value),
          });
        break;

      case `${OTP_INPUT}_5`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            5: parseInt(value),
          });
        break;

      case `${OTP_INPUT}_6`:
        value.length <= 1 &&
          setOtpDigit({
            ...otpDigit,
            6: parseInt(value),
          });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !otpDigit[1] ||
      !otpDigit[2] ||
      !otpDigit[3] ||
      !otpDigit[4] ||
      !otpDigit[5] ||
      !otpDigit[6]
    ) {
      // Display a error toast message, stating a valid otp is required
      toastCtxPayload.displayToast("Please provide a valid OTP!", ERROR_TOAST);
    }

    // Call the helper method for otp verification
    OTPVerificationHelper.verify(
      otpDigit[1],
      otpDigit[2],
      otpDigit[3],
      otpDigit[4],
      otpDigit[5],
      otpDigit[6],
      {
        toastDisplayer: toastCtxPayload.displayToast,
        isOtpVerificationNeeded: isOtpVerificationNeeded,
        relogin: relogin,
      }
    );
  };

  return (
    <form className={`${className}`} onSubmit={handleSubmit}>
      <h1 className="text-3xl font-extrabold p-4">Verify OTP</h1>
      <h2 className="sub-header text-xl">An OTP has been sent to your registered phone number.</h2>
      <h2 className="sub-header text-xl  p-2">Kindly verify the OTP to continue.</h2>
      <div className="input-boxes p-4 px-16 flex items-center justify-center gap-8">
        {noOfInputBoxes.map(boxId => {
          return (
            <input
              key={boxId}
              id={`${OTP_INPUT}_${boxId}`}
              name="otp-input"
              type="text"
              className="input-box rounded-none border-t-0 border-l-0 border-r-0 outline-none text-center"
              value={!otpDigit[boxId] ? "" : otpDigit[boxId].toString()}
              onChange={handleChange}
              autoComplete="off"
            />
          );
        })}
      </div>
      <div className="p-6">
        <VerifyButton />
      </div>
    </form>
  );
}
