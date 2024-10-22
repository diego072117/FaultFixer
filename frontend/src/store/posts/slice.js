import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  posts: [],
  searchPost: [],
  postsByUser: [],
  commentsPost: [],
  postById: null,
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_URL_API } = import.meta.env;

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Posts/CreatePost`,
        postData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      });
  },
});

export default postsSlice.reducer;
