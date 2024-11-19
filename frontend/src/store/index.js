// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/slice";
import postsSlice from "./posts/slice"
import gptSlice from "./gpt/slice"

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    gpt: gptSlice,
  },
});

export default store;
