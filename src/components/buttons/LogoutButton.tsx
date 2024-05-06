import React from "react";
import LogoutHelper from "../../helpers/LogoutHelper";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export default function LogoutButton({ className }: Props) {
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call the logout helper method
    LogoutHelper.logout();
  };

  return (
    <button
      onClick={handleLogout}
      className={`py-2 px-6 rounded-lg bg-gradient-to-r from-[#5170FF] to-[#FF66C4] text-white text-lg ${className}`}
    >
      Logout
    </button>
  );
}
