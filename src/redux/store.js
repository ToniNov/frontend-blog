import { configureStore } from '@reduxjs/toolkit';
import {postsReducer} from "./slices/postsSlices";
import {authReducer} from "./slices/authSlices";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
