import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import useOTPVerification from "../custom_hooks/useOTPVerification";
import OTPVerificationForm from "../components/forms/OTPVerificationForm";

export default function Login() {
  const { otpVerificationNeeded, isOtpVerificationNeeded } = useOTPVerification();

  const [relogin, toRelogin] = useState(false);

  return (
    <div className="flex items-center h-screen relative">
      <section className="left-section bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6] text-white w-1/2 h-full flex flex-col justify-center items-center absolute rounded-full z-[11] scale-95">
        <h1 className="header text-7xl font-bold font-lovelo_bold">IMS</h1>
        <h2 className="sub-header text-2xl p-4 w-[35rem] font-garet_normal">
          Your very own <span className="font-bold">Inventory Management System</span>
        </h2>
      </section>

      <section className="login-section flex flex-col justify-center w-1/2 h-full absolute right-0">
        {!otpVerificationNeeded ? (
          <LoginForm isOtpVerificationNeeded={isOtpVerificationNeeded} relogin={relogin} />
        ) : (
          <OTPVerificationForm
            isOtpVerificationNeeded={isOtpVerificationNeeded}
            relogin={toRelogin}
          />
        )}
      </section>
    </div>
  );
}
