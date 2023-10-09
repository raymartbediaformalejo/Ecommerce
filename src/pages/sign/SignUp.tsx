import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "../../styles/pages/sign/Sign.module.css";
import Button from "../../components/ui/Button";
import { useRegisterMutation } from "../../redux/auth/auth.api";
import useActions from "../../redux/hooks/useActions";
import { TRegister } from "../../redux/auth/auth.type";
import userIcon from "../../assets/icons/profile2.svg";

const SignUp = () => {
  const [statusMessage, setStatusMessage] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const [register] = useRegisterMutation();
  const { setAuthToken, setUser } = useActions();
  const navigate = useNavigate();

  const isValidForm = (formData: TRegister) => {
    const { email, password, cpassword, firstname, lastname } = formData;

    if (
      !email.length ||
      !password.length ||
      !cpassword.length ||
      !firstname.length ||
      !lastname.length
    ) {
      setStatusMessage((prev) => ({
        ...prev,
        isError: true,
        message: "Please fill in all fields",
      }));
      return false;
    }
    if (password !== cpassword) {
      setStatusMessage((prev) => ({
        ...prev,
        isError: true,
        errorMessage: "Password do not match",
      }));
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          ...prev,
          isSuccess: true,
          successMessage: "Registration successful",
        }));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setStatusMessage(error.data.message);
      });
  };

  return (
    <div className={classes["sign-login-page"]}>
      <div className={classes["sign-login-page-card"]}>
        <h1 className={classes["title"]}>Sign Up</h1>

        <form action="/signup" onSubmit={handleFormSubmit}>
          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="email" type="email" placeholder="Email" />
              <img src={userIcon} />
            </div>
          </div>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="firstname" type="text" placeholder="Firstname" />
            </div>
          </div>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="lastname" type="text" placeholder="Lastname" />
            </div>
          </div>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input name="password" type="password" placeholder="Password" />
            </div>
          </div>

          <div className={classes["form-item"]}>
            <div className={classes["form-field-with-icon"]}>
              <input
                name="cpassword"
                type="password"
                placeholder="Confirm password"
              />
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

          <div>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
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

export default SignUp;
