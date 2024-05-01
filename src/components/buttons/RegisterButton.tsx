import React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function RegisterButton({ className }: Props) {
  return (
    <button
      className={`py-2 px-6 rounded-lg bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6] text-white text-lg ${className}`}
    >
      Register
    </button>
  );
}
