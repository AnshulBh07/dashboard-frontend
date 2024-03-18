import axios, { AxiosError, isAxiosError } from "axios";

export const fetchAllPosts = async (signal: AbortSignal) => {
  try {
    const tokens = sessionStorage.getItem("tokens");

    if (tokens)
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;

    const response = await axios({
      url: "https://dashboard-backend-r223.onrender.com/posts",
      method: "get",
      signal: signal,
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

export const addComment = async () => {};
