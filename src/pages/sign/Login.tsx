import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "../../styles/pages/sign/Sign.module.css";
import Button from "../../components/ui/Button";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/auth/auth.api";
import useActions from "../../redux/hooks/useActions";
import { TLogin } from "../../redux/auth/auth.type";

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
          ...prev,
          isError: false,
          isSuccess: !prev.isSuccess,
          successMessage: "Login successful",
        }));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setStatusMessage((prev) => ({
          ...prev,
          isError: !prev.isError,
          isSuccess: false,
          message: error.data.message,
        }));
      });
  };

  return (
    <div className={classes["sign-login-page"]}>
      <div className={classes["sign-login-page-card"]}>
        <h1 className={classes["title"]}>Login</h1>

        <form action="/signup" onSubmit={handleFormSubmit}>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="username" type="text" placeholder="Username" />
            </div>
          </div>
          <p className={classes["api-sign-example"]}>api example: kminchelle</p>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="password" type="password" placeholder="Password" />
            </div>
          </div>

          <p className="api-sign-example">api example: 0lelplR</p>

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

          <div>
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
