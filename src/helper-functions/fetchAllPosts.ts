import axios from "axios";

export const fetchAllPosts = async (signal: AbortSignal) => {
  try {
    const response = await axios({
      url: "https://dashboard-backend-r223.onrender.com/posts",
      method: "get",
      signal: signal,
    });

    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
