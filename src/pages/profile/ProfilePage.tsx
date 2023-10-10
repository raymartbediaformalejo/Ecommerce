import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAuthUserSelector } from "../../redux/auth/auth.slice";
import useActions from "../../redux/hooks/useActions";
import Button from "../../components/ui/Button";
import { useGetUserQuery } from "../../redux/auth/auth.api";
import classes from "../../styles/pages/profile/Profile.module.css";

const ProfilePage = () => {
  let user;

  const userTemp = useAuthUserSelector();
  const { logout } = useActions();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "1";
  const { data: userApi } = useGetUserQuery(userId);

  if (userTemp) {
    user = userTemp;
  } else {
    user = userApi;
  }

  const logoutHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout();
    navigate("/");
  };

  return (
    <>
      {user && (
        <div className={classes["profile"]}>
          <div className={classes["profile-header"]}>
            <div className={classes["profile-pic"]}>
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <div className={classes["profile-info"]}>
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className={classes["profile-details"]}>
            <ul>
              <li className={classes["info"]}>
                <strong>Age:</strong> {user.age}
              </li>
              <li className={classes["info"]}>
                <strong>Birth Date:</strong> {user.birthDate}
              </li>
              <li className={classes["info"]}>
                <strong>Phone:</strong> {user.phone}
              </li>
              <li className={classes["info"]}>
                <strong>City:</strong> {user.address.city}
              </li>
              <li className={classes["info"]}>
                <strong>University:</strong> {user.university}
              </li>
            </ul>
          </div>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
