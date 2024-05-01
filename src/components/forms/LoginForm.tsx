import React, { HTMLProps } from "react";
import LoginButton from "../buttons/LoginButton";

interface Props extends HTMLProps<HTMLDivElement> {}

export default function LoginForm({ className }: Props) {
  return (
    <div className={`${className}`}>
      <h1 className="text-3xl font-extrabold p-4">Login</h1>
      <div className="input-boxes p-4 px-16 flex flex-col gap-8">
        <input
          name="phone-number-input"
          type="text"
          className="input-box"
          placeholder="Phone no.*"
        />
        <input
          name="password-input"
          type="password"
          className="input-box"
          placeholder="Password*"
        />
      </div>
      <div className="p-6">
        <LoginButton className="px-8" />
      </div>
    </div>
  );
}
