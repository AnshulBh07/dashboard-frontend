import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./reducer/postReducer";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
