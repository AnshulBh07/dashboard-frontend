import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./reducer/postReducer";
import { loginReducer } from "./reducer/loginReducer";
import { signupReducer } from "./reducer/signupReducer";
import { toastReducer } from "./reducer/toastReducer";

export const store = configureStore({
  reducer: {
    post: postReducer,
    login: loginReducer,
    signup: signupReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
