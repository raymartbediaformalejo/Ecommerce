import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "../../styles/pages/sign/Sign.module.css";
import Button from "../../components/ui/Button";
import { useLoginMutation } from "../../redux/auth/auth.api";
import useActions from "../../redux/hooks/useActions";
import { TLogin } from "../../redux/auth/auth.type";
import logo from "../../assets/logo-open-fashion.svg";
import { UserIcon } from "../../components/icons/UserIcon";
import { PasswordIcon } from "../../components/icons/PasswordIcon";

const Login = () => {
  const [statusMessage, setStatusMessage] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const [login] = useLoginMutation();
  const { setAuthToken, setAuthUserId } = useActions();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget) as Iterable<[TLogin]>;
    const entries: TLogin = Object.fromEntries(formData);

    await login(entries)
      .unwrap()
      .then((data) => {
        const { token, id } = data;

        setAuthToken({ token });
        setAuthUserId({ userId: id });

        setStatusMessage((prev) => ({
          isError: false,
          isSuccess: !prev.isSuccess,
          message: "Login successful",
        }));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setStatusMessage((prev) => ({
          isError: !prev.isError,
          isSuccess: false,
          message: error.data.message,
        }));
      });
  };

  return (
    <div className={classes["sign-login-page"]}>
      <div className={classes["sign-login-page-card"]}>
        <img className={classes["logo"]} src={logo} alt="Open Fashion" />

        <form action="/signup" onSubmit={handleFormSubmit}>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="username" type="text" placeholder="Username" />
              <UserIcon />
            </div>
            <p className={classes["api-sign-example"]}>
              api example: kminchelle
            </p>
          </div>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="password" type="password" placeholder="Password" />
              <PasswordIcon />
            </div>
            <p className={classes["api-sign-example"]}>api example: 0lelplR</p>
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
            <Button type="submit">Login</Button>
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

export default Login;
