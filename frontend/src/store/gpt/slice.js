import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  responseGpt: null,
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_CHAT_GPT_API_URL, VITE_API_KEY } = import.meta.env;

export const chatGptResponseAsync = createAsyncThunk(
  "gpt/chatGptResponseAsync",
  async (content) => {
    try {
      const response = await axios.post(
        VITE_CHAT_GPT_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: content }],
          temperature: 0.5,
          max_tokens: 1024,
        },
        {
          headers: {
            Authorization: VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      
      return response.data; // Devolver los datos de la respuesta
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
  }
);

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatGptResponseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(chatGptResponseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseGpt = action.payload.choices[0].message.content;;
        toast.success("Successfully updated post!");
      })
      .addCase(chatGptResponseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gptSlice.reducer;
