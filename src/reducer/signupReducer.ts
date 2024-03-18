import { ISignupState } from "../data/interface";

const initialState: ISignupState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

type actionType = { type: string; payload?: string | number };

export const signupReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case "signup/first_name":
      return { ...state, first_name: String(action.payload!) };
    case "signup/last_name":
      return { ...state, last_name: String(action.payload!) };
    case "signup/email":
      return { ...state, email: String(action.payload!) };
    case "signup/pwd":
      return { ...state, password: String(action.payload!) };
    case "signup/cpwd":
      return { ...state, confirm_password: String(action.payload!) };
    case "signup/dob_day":
      return { ...state, dob_day: Number(action.payload!) };
    case "signup/dob_month":
      return { ...state, dob_month: Number(action.payload!) };
    case "signup/dob_year":
      return { ...state, dob_year: Number(action.payload!) };
    default:
      return state;
  }
};
