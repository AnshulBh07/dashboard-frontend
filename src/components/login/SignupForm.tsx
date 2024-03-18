import React, { useState } from "react";
import styles from "../../sass/signupFormStyles.module.scss";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToast } from "../../helper-functions/setToast";
import { validateForm } from "../../helper-functions/formValidation";
import { addUser, fetchUser } from "../../helper-functions/signupRequests";
import { ButtonLoader } from "../loader/ButtonLoader";

export const SignupForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signupState = useSelector((state: RootState) => state.signup);
  const { email, first_name, last_name, password, confirm_password } =
    signupState;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "email":
        dispatch({ type: "signup/email", payload: e.target.value });
        break;
      case "pwd":
        dispatch({ type: "signup/pwd", payload: e.target.value });
        break;
      case "cpwd":
        dispatch({ type: "signup/cpwd", payload: e.target.value });
        break;
      case "fName":
        dispatch({ type: "signup/first_name", payload: e.target.value });
        break;
      case "lName":
        dispatch({ type: "signup/last_name", payload: e.target.value });
        break;

      default:
        break;
    }
  };

  let timer: NodeJS.Timeout;

  // an asynchronous signup function that first checks whether the user is present if not, sign up
  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    clearTimeout(timer);
    e.preventDefault();
    setIsLoading(true);
    // console.log(signupState);

    // validate everything first
    if (
      email === "" ||
      password === "" ||
      first_name === "" ||
      last_name === ""
    ) {
      setToast("error", "All fields are mandatory.", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (password !== confirm_password) {
      setToast("error", "Password doesn't match!", dispatch, timer);
      setIsLoading(false);
      return;
    }

    if (!validateForm(signupState)[0]) {
      setToast("error", validateForm(signupState)[1], dispatch, timer);
      setIsLoading(false);
      return;
    }

    // everything is ok, we make a request to server to check for user
    let response = await fetchUser(email);

    if (response) {
      // if user already exists
      if (
        response.status === 200 ||
        response.status === 400 ||
        response.status === 500
      ) {
        setToast("error", response.data, dispatch, timer);
        setIsLoading(false);
        return;
      }

      // user doesn't exist ,so insert
      response = await addUser(signupState);

      if (response) {
        if (response.status === 400 || response.status === 500) {
          setToast("error", response.data, dispatch, timer);
          setIsLoading(false);
          return;
        }

        // addition successful, redirect to login
        setToast("success", response.data, dispatch, timer);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.form_container}>
      <form action="post" className={styles.form_wrapper}>
        <h2 className={styles.title}>sign up</h2>

        <div className={styles.name}>
          <label htmlFor="fName" className={styles.input_field}>
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="first name"
              value={first_name}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor="lName" className={styles.input_field}>
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="last name"
              value={last_name}
              onChange={handleInputChange}
            />
          </label>
        </div>

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

        <label
          htmlFor="cpwd"
          className={styles.input_field}
          style={
            password !== confirm_password ? { border: "1px solid red" } : {}
          }
        >
          <CiLock className={styles.icon} />
          <input
            type="password"
            name="cpwd"
            id="cpwd"
            placeholder="retype password"
            value={confirm_password}
            onChange={handleInputChange}
          />
        </label>

        <button className={styles.login_btn} onClick={handleFormSubmit}>
          {isLoading && <ButtonLoader />}
          signup
        </button>

        <div className={styles.redirect}>
          <p>Already have an account?</p>
          <Link to={"/login"} className={styles.link}>
            Login
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
