import React, { ChangeEvent, FormEvent, HTMLProps, useContext, useMemo, useState } from "react";
import {
  EMAIL_INPUT,
  FULL_NAME_INPUT,
  PASSWORD_INPUT,
  PHONE_INPUT,
  USERNAME_INPUT,
} from "../../utils/Constants";
import { ToastContext } from "../../App";
import { useNavigate } from "react-router-dom";
import RegisterButton from "../buttons/RegisterButton";
import Indicator from "../Indicator";
import RegistrationHelper from "../../helpers/RegisterHelper";

interface Props extends HTMLProps<HTMLElement> {}

export default function RegisterForm({ className }: Props) {
  const [registerDetails, setRegisterDetails] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: 0,
    password: "",
  });

  const [showErrorIndicator, toShowErrIndicator] = useState({
    onEmail: false,
    onUsername: false,
    onFullName: false,
    onPhone: false,
    onPassword: false,
  });

  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const navigate = useNavigate();

  const toastCtxPayload = useContext(ToastContext);
  if (!toastCtxPayload) throw new Error("Toast context payload is null!");

  // Show error indicators for each invalid field
  useMemo(() => {
    invalidFields.forEach(invalidField => {
      switch (invalidField) {
        case EMAIL_INPUT:
          toShowErrIndicator(prevState => {
            return { ...prevState, onEmail: true };
          });
          break;

        case USERNAME_INPUT:
          toShowErrIndicator(prevState => {
            return { ...prevState, onUsername: true };
          });
          break;

        case FULL_NAME_INPUT:
          toShowErrIndicator(prevState => {
            return { ...prevState, onFullName: true };
          });
          break;

        case PHONE_INPUT:
          toShowErrIndicator(prevState => {
            return { ...prevState, onPhone: true };
          });
          break;

        case PASSWORD_INPUT:
          toShowErrIndicator(prevState => {
            return { ...prevState, onPassword: true };
          });
          break;

        default:
          break;
      }
    });
  }, [invalidFields]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case FULL_NAME_INPUT:
        // Remove any preloaded error indicator
        toShowErrIndicator({
          ...showErrorIndicator,
          onFullName: false,
        });

        //  Full name cannot exceed 50 chars
        value.length <= 50 &&
          setRegisterDetails({
            ...registerDetails,
            full_name: value,
          });
        break;

      case USERNAME_INPUT:
        // Remove any preloaded error indicator
        toShowErrIndicator({
          ...showErrorIndicator,
          onUsername: false,
        });
        //  Username cannot exceed 10 chars
        value.length <= 10 &&
          setRegisterDetails({
            ...registerDetails,
            username: value,
          });
        break;

      case EMAIL_INPUT:
        // Remove any preloaded error indicator
        toShowErrIndicator({
          ...showErrorIndicator,
          onEmail: false,
        });
        //  Email cannot exceed 30 chars
        value.length <= 30 &&
          setRegisterDetails({
            ...registerDetails,
            email: value,
          });
        break;

      case PHONE_INPUT:
        // Remove any preloaded error indicator
        toShowErrIndicator({
          ...showErrorIndicator,
          onPhone: false,
        });
        if (value.length <= 10)
          setRegisterDetails({
            ...registerDetails,
            phone: parseInt(value),
          });
        break;

      case PASSWORD_INPUT:
        // Remove any preloaded error indicator
        toShowErrIndicator({
          ...showErrorIndicator,
          onPassword: false,
        });
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

    // All fields are mandatory. Submit the form only when all the fields are not empty.
    let invalidFields = [];
    // Add minor validations before submitting the form
    // TODO: move the validations to seperate methods under a Validator class
    // to validate more precisely
    if (!registerDetails.email) {
      invalidFields.push(EMAIL_INPUT);
    }
    if (!registerDetails.username) {
      invalidFields.push(USERNAME_INPUT);
    }
    if (!registerDetails.full_name) {
      invalidFields.push(FULL_NAME_INPUT);
    }
    if (!registerDetails.phone || registerDetails.phone.toString().length < 10) {
      invalidFields.push(PHONE_INPUT);
    }
    if (!registerDetails.password || registerDetails.password.length < 8) {
      invalidFields.push(PASSWORD_INPUT);
    }

    if (invalidFields.length > 0) {
      setInvalidFields([...invalidFields]);
      return;
    }

    // Call the helper method to help with the registration
    const registrationHelper = new RegistrationHelper(
      registerDetails,
      toastCtxPayload.displayToast,
      navigate
    );
    registrationHelper.register();
  };

  return (
    <form className={`${className}`} onSubmit={handleFormSubmit}>
      <h1 className="text-3xl font-extrabold p-4">Register</h1>
      <div className="input-boxes p-4 px-16 flex flex-col gap-8">
        <div className="relative">
          <input
            id={FULL_NAME_INPUT}
            name="full-name-input"
            type="text"
            className="input-box"
            placeholder="Full name*"
            value={registerDetails.full_name}
            onChange={handleChange}
          />
          {showErrorIndicator.onFullName && <Indicator message="Full name is required!" isError />}
        </div>
        <div className="relative">
          <input
            id={USERNAME_INPUT}
            name="username-input"
            type="text"
            className="input-box"
            placeholder="Username*"
            value={registerDetails.username}
            onChange={handleChange}
          />
          {showErrorIndicator.onUsername && <Indicator message="Username is required!" isError />}
        </div>
        <div className="relative">
          <input
            id={EMAIL_INPUT}
            name="email-input"
            type="email"
            className="input-box"
            placeholder="Email*"
            value={registerDetails.email}
            onChange={handleChange}
          />
          {showErrorIndicator.onEmail && <Indicator message="Email id is required!" isError />}
        </div>
        <div className="relative">
          <input
            id={PHONE_INPUT}
            name="phone-number-input"
            type="text"
            className="input-box"
            placeholder="Phone no.*"
            value={!registerDetails.phone ? "" : registerDetails.phone.toString()}
            onChange={handleChange}
          />
          {showErrorIndicator.onPhone && (
            <Indicator message="A valid phone number is required!" isError />
          )}
        </div>
        <div className="relative">
          <input
            id={PASSWORD_INPUT}
            name="password-input"
            type="password"
            className="input-box"
            placeholder="Password*"
            value={registerDetails.password}
            onChange={handleChange}
          />
          {showErrorIndicator.onPassword && (
            <Indicator message="A strong and valid password is required!" isError />
          )}
        </div>
      </div>
      <div className="p-6">
        <RegisterButton className="py-3 px-8" />
      </div>
    </form>
  );
}
