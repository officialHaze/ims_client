import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../utils/Routes";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  navigateOnly?: boolean;
}

export default function LoginButton({ className, navigateOnly }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigateOnly && navigate(LOGIN); // Navigate to login page
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-6 rounded-lg bg-gradient-to-r from-[#5170FF] to-[#FF66C4] text-white text-lg ${className}`}
    >
      Login
    </button>
  );
}
