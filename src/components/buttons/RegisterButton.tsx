import React from "react";
import { REGISTER } from "../../utils/Routes";
import { useNavigate } from "react-router-dom";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  navigateOnly?: boolean;
}

export default function RegisterButton({ className, navigateOnly }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigateOnly && navigate(REGISTER);
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-6 rounded-lg bg-gradient-to-r from-[#8C52FF] to-[#5CE1E6] text-white text-lg ${className}`}
    >
      Register
    </button>
  );
}
