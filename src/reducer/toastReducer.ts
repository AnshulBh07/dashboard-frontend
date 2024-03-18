import { IToast } from "../data/interface";

const initialState: IToast = {
  status: "",
  message: "",
  state: "initial",
};

type actionType = { type: string; payload?: string };

export const toastReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "toast/setStatus":
      return { ...state, status: action.payload! };
    case "toast/setMessage":
      return { ...state, message: action.payload! };
    case "toast/show":
      return { ...state, state: "open" };
    case "toast/hide":
      return { ...state, state: "close" };
    default:
      return state;
  }
};
