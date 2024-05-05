import { useState } from "react";

export default function useOTPVerification() {
  const [otpVerificationNeeded, isOtpVerificationNeeded] = useState(false);

  return { otpVerificationNeeded, isOtpVerificationNeeded };
}
