import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "../../styles/pages/sign/Sign.module.css";
import Button from "../../components/ui/Button";
import { useRegisterMutation } from "../../redux/auth/auth.api";
import useActions from "../../redux/hooks/useActions";
import { TRegister } from "../../redux/auth/auth.type";
import { PasswordIcon } from "../../components/icons/PasswordIcon";
import { EmailIcon } from "../../components/icons/EmailIcon";
import { UserIcon } from "../../components/icons/UserIcon";
import logo from "../../assets/logo-open-fashion.svg";
const Signup = () => {
  const [statusMessage, setStatusMessage] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const [register] = useRegisterMutation();
  const { setAuthToken, setUser } = useActions();
  const navigate = useNavigate();

  const isValidForm = (formData: TRegister) => {
    const { email, password, cpassword, firstName, lastName } = formData;
    console.log(email);
    console.log(password);
    console.log(cpassword);
    console.log(firstName);
    console.log(lastName);

    if (
      !email.length ||
      !password.length ||
      !cpassword.length ||
      !firstName.length ||
      !lastName.length
    ) {
      setStatusMessage((prev) => ({
        isError: !prev.isError,
        isSuccess: false,
        message: "Please fill in the fields",
      }));
      return false;
    }

    if (password !== cpassword)
      setStatusMessage((prev) => ({
        isError: !prev.isError,
        isSuccess: false,
        message: "Password do not match",
      }));

    return true;
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget) as Iterable<[TRegister]>;
    const entries: TRegister = Object.fromEntries(formData);

    if (!isValidForm(entries)) return;

    await register(entries)
      .unwrap()
      .then((data) => {
        const { token } = data;
        setAuthToken({ token });
        setUser(data);

        setStatusMessage((prev) => ({
          isError: false,
          isSuccess: !prev.isSuccess,
          message: "Registration successful",
        }));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setStatusMessage((prev) => ({
          isError: !prev.isError,
          isSuccess: false,
          message: err.data.message,
        }));
      });
  };

  return (
    <div className={classes["sign-login-page"]}>
      <div className={classes["sign-login-page-card"]}>
        <img className={classes["logo"]} src={logo} alt="Open Fashion" />

        <form action="/register" onSubmit={formSubmitHandler}>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input type="email" name="email" placeholder="Email:" />
              <EmailIcon />
            </div>
          </div>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="firstName" type="text" placeholder="Firstname" />
              <UserIcon />
            </div>
          </div>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input type="text" name="lastName" placeholder="LastName:" />
              <UserIcon />
            </div>
          </div>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input type="password" name="password" placeholder="Password:" />
              <PasswordIcon />
            </div>
          </div>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm password:"
              />
              <PasswordIcon />
            </div>
          </div>
          {statusMessage && (
            <div
              className={`${classes["status-message"]} ${
                statusMessage.isError ? classes["error"] : ""
              } ${statusMessage.isSuccess ? classes["success"] : ""}`}
            >
              {statusMessage.message}
            </div>
          )}
          <div className={classes["form-submit"]}>
            <Button type="submit" size="large">
              Sign Up
            </Button>
          </div>
          <div className={classes["toggle-sign-card"]}>
            <p>
              Do not have an account? <Link to="/signup">Sign Up here</Link>
            </p>
            <p>
              Back to <Link to="/">Home</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
