import { useDispatch } from "react-redux";
import {
  createPostAsync,
} from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();

  const createPost = async (postData) => {
    return dispatch(createPostAsync(postData));
  };


  return {
    createPost,
  };
};
