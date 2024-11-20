import { useDispatch } from "react-redux";
import { chatGptResponseAsync } from "../store/gpt/slice";

export const useGptActions = () => {
  const dispatch = useDispatch();

  const chatGptResponse = async (content) => {
    return dispatch(chatGptResponseAsync(content));
  };

  return {
    chatGptResponse,
  };
};
