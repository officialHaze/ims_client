import React, { ChangeEvent, FormEvent, HTMLProps, useContext, useState } from "react";
import LoginButton from "../buttons/LoginButton";
import { PASSWORD_INPUT, PHONE_INPUT } from "../../utils/Constants";
import LoginHelper from "../../helpers/LoginHelper";
import { ToastContext } from "../../App";
import { useNavigate } from "react-router-dom";

interface Props extends HTMLProps<HTMLElement> {}

export default function LoginForm({ className }: Props) {
  const [loginDetails, setLoginDetails] = useState({
    phone: 0,
    password: "",
  });

  const navigate = useNavigate();

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case PHONE_INPUT:
        if (value.length <= 10)
          setLoginDetails({
            ...loginDetails,
            phone: parseInt(value),
          });
        break;

      case PASSWORD_INPUT:
        setLoginDetails({
          ...loginDetails,
          password: value,
        });
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh

    //Submit the form
    const loginHelper = new LoginHelper(
      loginDetails.phone,
      loginDetails.password,
      toastCtxPayload.displayToast,
      navigate
    );
    await loginHelper.login();
  };

  return (
    <form className={`${className}`} onSubmit={handleFormSubmit}>
      <h1 className="text-3xl font-extrabold p-4">Login</h1>
      <div className="input-boxes p-4 px-16 flex flex-col gap-8">
        <input
          id={PHONE_INPUT}
          name="phone-number-input"
          type="text"
          className="input-box"
          placeholder="Phone no.*"
          value={!loginDetails.phone ? "" : loginDetails.phone.toString()}
          onChange={handleChange}
        />
        <input
          id={PASSWORD_INPUT}
          name="password-input"
          type="password"
          className="input-box"
          placeholder="Password*"
          value={loginDetails.password}
          onChange={handleChange}
        />
      </div>
      <div className="p-6">
        <LoginButton className="px-8" />
      </div>
    </form>
  );
}
