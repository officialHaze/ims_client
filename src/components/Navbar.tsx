import React, { HTMLProps } from "react";
import RegisterButton from "./buttons/RegisterButton";
import { HOME, LANDING, LOGIN } from "../utils/Routes";
import LogoutButton from "./buttons/LogoutButton";

interface Props extends HTMLProps<HTMLDivElement> {
  path: string;
}

const authenticatedRoutes = [HOME];

const unAuthenticatedRoutes = [LOGIN, LANDING];

export default function Navbar({ path, className }: Props) {
  return (
    <div
      className={`p-4 border-b-2 border-gray-300 fixed z-10 w-full bg-white flex items-center justify-center ${className}`}
    >
      <h1 className="font-bold text-4xl font-bauhaus_extrabold">IMS</h1>
      {unAuthenticatedRoutes.includes(path) && <RegisterButton className="absolute right-28" />}
      {authenticatedRoutes.includes(path) && <LogoutButton className="absolute right-28" />}
    </div>
  );
}
