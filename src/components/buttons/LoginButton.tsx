import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function LoginButton({ className }: Props) {
  return (
    <button
      className={`py-2 px-6 rounded-lg bg-gradient-to-r from-[#5170FF] to-[#FF66C4] text-white text-lg ${className}`}
    >
      Login
    </button>
  );
}
