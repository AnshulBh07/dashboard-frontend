import axios from "axios";

export const fetchAllPosts = async (signal: AbortSignal) => {
  try {
    const response = await axios({
      url: "http://localhost:3001/posts",
      method: "get",
      signal: signal,
    });

    // console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
