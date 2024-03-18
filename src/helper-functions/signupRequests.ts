import axios, { AxiosError, isAxiosError } from "axios";
import { ISignupState } from "../data/interface";

export const fetchUser = async (email: string) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://dashboard-backend-r223.onrender.com/find_user",
      params: { email: email },
    });

    if (response) return response;
  } catch (err) {
    // all 4xx and 5xx requests execute catch block in axios
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        console.error("Network error!");
        return;
      }
    }
    console.error(err);
  }
};

export const addUser = async (userObj: ISignupState) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://dashboard-backend-r223.onrender.com/signup",
      data: userObj,
    });

    if (response) return response;
  } catch (err) {
    // all 4xx and 5xx requests execute catch block in axios
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      } else {
        console.error("Network error!");
        return;
      }
    }
    console.error(err);
  }
};
