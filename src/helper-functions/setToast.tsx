import { AppDispatch } from "../store";

// function that sets toast into action
export const setToast = (
  status: string,
  message: string,
  dispatch: AppDispatch,
  timer: NodeJS.Timeout
) => {
  clearTimeout(timer);
  dispatch({ type: "toast/setStatus", payload: status });
  dispatch({ type: "toast/setMessage", payload: message });
  dispatch({ type: "toast/show" });
  timer = setTimeout(() => {
    dispatch({ type: "toast/hide" });
  }, 4000);
};
