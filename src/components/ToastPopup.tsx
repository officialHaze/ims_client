import React, { HTMLProps } from "react";
import { ERROR_TOAST } from "../utils/Constants";

interface Props extends HTMLProps<HTMLElement> {
  toastStatus: string;
  toastMessage: string;
}

export default function ToastPopup({ toastMessage, toastStatus, className }: Props) {
  return (
    <div className="absolute top-10 z-[12] w-full flex items-center justify-center">
      <div
        className={`w-fit p-4 rounded-xl text-white font-bold text-lg shadow-lg ${
          toastStatus.includes(ERROR_TOAST) ? "bg-red-500" : "bg-green-400"
        } ${className}`}
      >
        {toastMessage}
      </div>
    </div>
  );
}
