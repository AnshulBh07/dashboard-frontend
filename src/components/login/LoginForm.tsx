import React, { useState } from "react";
import styles from "../../sass/loginFormStyles.module.scss";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToast } from "../../helper-functions/setToast";
import {
  validateEmail,
  validatePassword,
} from "../../helper-functions/formValidation";
import { loginUser } from "../../helper-functions/loginRequests";
import { ButtonLoader } from "../loader/ButtonLoader";

export const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  const { email, password } = loginState;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "email":
        dispatch({ type: "login/email", payload: e.target.value });
        break;
      case "pwd":
        dispatch({ type: "login/password", payload: e.target.value });
        break;
      default:
        break;
    }
  };

  let timer: NodeJS.Timeout;

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // validate inputs first
    if (email === "" || password === "") {
      setToast("error", "All fields are mandatory.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setToast("error", "Invalid email address.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)[0]) {
      setToast("error", "Invalid password.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    // check if the user exists or not
    const response = await loginUser(loginState);

    if (response) {
      if (
        response.status === 401 ||
        response.status === 404 ||
        response.status === 500
      ) {
        setToast("error", response.data, dispatch, timer);
        setIsLoading(false);
        return;
      }

      // we are authenticated and get token, store tokens in session storage
      sessionStorage.setItem("tokens", JSON.stringify(response.data));
      dispatch({ type: "login/authenticate" });
      setIsLoading(false);

      navigate("/");
    }
  };

  return (
    <div className={styles.form_container}>
      <form action="post" className={styles.form_wrapper}>
        <h2 className={styles.title}>login</h2>

        <label htmlFor="email" className={styles.input_field}>
          <TfiEmail className={styles.icon} />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="enter email"
            value={email}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="pwd" className={styles.input_field}>
          <CiLock className={styles.icon} />
          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="enter password"
            value={password}
            onChange={handleInputChange}
          />
        </label>

        <Link to={""} className={styles.forgot}>
          Forgot password?
        </Link>

        <button className={styles.login_btn} onClick={handleFormSubmit}>
          {isLoading && <ButtonLoader />}
          login
        </button>

        <div className={styles.redirect}>
          <p>Don't have an account?</p>
          <Link to={"/login/signup"} className={styles.link}>
            Sign up
          </Link>
        </div>
      </form>

      <div className={styles.separator}></div>

      <button className={styles.google_login}>
        <FcGoogle className={styles.google_icon} />
        Login with Google
      </button>
    </div>
  );
};
