import { useDispatch } from "react-redux";
import { createPostAsync, getAllPostAsync } from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();

  const createPost = async (postData) => {
    return dispatch(createPostAsync(postData));
  };

  const allPosts = async () => {
    return dispatch(getAllPostAsync());
  };

  return {
    createPost,
    allPosts,
  };
};
