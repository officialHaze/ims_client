import React, { ChangeEvent, FormEvent, HTMLProps, useContext, useState } from "react";
import LoginButton from "../buttons/LoginButton";
import {
  EMAIL_INPUT,
  FULL_NAME_INPUT,
  PASSWORD_INPUT,
  PHONE_INPUT,
  USERNAME_INPUT,
} from "../../utils/Constants";
import LoginHelper from "../../helpers/LoginHelper";
import { ToastContext } from "../../App";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../buttons/RegisterButton";

interface Props extends HTMLProps<HTMLElement> {}

export default function RegisterForm({ className }: Props) {
  const [registerDetails, setRegisterDetails] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: 0,
    password: "",
  });

  const navigate = useNavigate();

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case FULL_NAME_INPUT:
        //  Full name cannot exceed 50 chars
        value.length <= 50 &&
          setRegisterDetails({
            ...registerDetails,
            full_name: value,
          });
        break;

      case USERNAME_INPUT:
        //  Username cannot exceed 10 chars
        value.length <= 10 &&
          setRegisterDetails({
            ...registerDetails,
            username: value,
          });
        break;

      case EMAIL_INPUT:
        //  Email cannot exceed 30 chars
        value.length <= 30 &&
          setRegisterDetails({
            ...registerDetails,
            email: value,
          });
        break;

      case PHONE_INPUT:
        if (value.length <= 10)
          setRegisterDetails({
            ...registerDetails,
            phone: parseInt(value),
          });
        break;

      case PASSWORD_INPUT:
        setRegisterDetails({
          ...registerDetails,
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
  };

  return (
    <form className={`${className}`} onSubmit={handleFormSubmit}>
      <h1 className="text-3xl font-extrabold p-4">Register</h1>
      <div className="input-boxes p-4 px-16 flex flex-col gap-8">
        <input
          id={FULL_NAME_INPUT}
          name="full-name-input"
          type="text"
          className="input-box"
          placeholder="Full name*"
          value={registerDetails.full_name}
          onChange={handleChange}
        />
        <input
          id={USERNAME_INPUT}
          name="username-input"
          type="text"
          className="input-box"
          placeholder="Username*"
          value={registerDetails.username}
          onChange={handleChange}
        />
        <input
          id={EMAIL_INPUT}
          name="email-input"
          type="text"
          className="input-box"
          placeholder="Email*"
          value={registerDetails.email}
          onChange={handleChange}
        />
        <input
          id={PHONE_INPUT}
          name="phone-number-input"
          type="text"
          className="input-box"
          placeholder="Phone no.*"
          value={!registerDetails.phone ? "" : registerDetails.phone.toString()}
          onChange={handleChange}
        />
        <input
          id={PASSWORD_INPUT}
          name="password-input"
          type="password"
          className="input-box"
          placeholder="Password*"
          value={registerDetails.password}
          onChange={handleChange}
        />
      </div>
      <div className="p-6">
        <RegisterButton className="py-3 px-8" />
      </div>
    </form>
  );
}
