import React, { HTMLProps } from "react";
import RegisterButton from "./buttons/RegisterButton";
import { HOME, LANDING, LOGIN, REGISTER } from "../utils/Routes";
import LogoutButton from "./buttons/LogoutButton";
import LoginButton from "./buttons/LoginButton";

interface Props extends HTMLProps<HTMLDivElement> {
  path: string;
}

const postLoginRoutes = [HOME];

const preLoginRoutes = [LOGIN, LANDING];

export default function Navbar({ path, className }: Props) {
  return (
    <div
      className={`p-4 border-b-2 border-gray-300 fixed z-10 w-full bg-white flex items-center justify-center ${className}`}
    >
      <h1 className="font-bold text-4xl font-bauhaus_extrabold">IMS</h1>
      {preLoginRoutes.includes(path) && (
        <RegisterButton className="absolute right-28" navigateOnly />
      )}
      {postLoginRoutes.includes(path) && <LogoutButton className="absolute right-28" />}
      {path.includes(REGISTER) && <LoginButton className="absolute right-28" navigateOnly />}
    </div>
  );
}
