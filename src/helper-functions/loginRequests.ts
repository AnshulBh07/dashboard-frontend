import axios, { AxiosError, isAxiosError } from "axios";
import { ILoginState } from "../data/interface";

export const loginUser = async (userObj: ILoginState) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://dashboard-backend-r223.onrender.com/login",
      data: userObj,
    });

    if (response) return response;
  } catch (err) {
    if (isAxiosError(err)) {
      const axiosErr = err as AxiosError;

      if (axiosErr.response) {
        return axiosErr.response;
      }
    }

    console.error(err);
  }
};
