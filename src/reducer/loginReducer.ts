import { ILoginState } from "../data/interface";

const initialState: ILoginState = {
  email: "",
  password: "",
  isAuthenticated: false,
};

type actionType = { type: string; payload?: string };

export const loginReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "login/email":
      return { ...state, email: action.payload! };
    case "login/password":
      return { ...state, password: action.payload! };
    case "login/authenticate":
      return { ...state, isAuthenticated: !state.isAuthenticated };
    default:
      return state;
  }
};
