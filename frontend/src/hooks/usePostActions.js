import { useDispatch } from "react-redux";
import {
  createPostAsync,
  getAllPostAsync,
  getCommetsPost,
  getPostById,
  getPostByUserId,
  saveCommentAsync,
  updatePostAsync,
} from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();

  const createPost = async (postData) => {
    return dispatch(createPostAsync(postData));
  };

  const allPosts = async () => {
    return dispatch(getAllPostAsync());
  };

  const listPostsByUser = async (id) => {
    return dispatch(getPostByUserId(id));
  };

  const postsById = async (id) => {
    return dispatch(getPostById(id));
  };

  const commetPost = async (id) => {
    return dispatch(getCommetsPost(id));
  };

  const saveComment = async (commentData) => {
    return dispatch(saveCommentAsync(commentData));
  };

  const updatePost = async (postData) => {
    return dispatch(updatePostAsync(postData));
  };

  return {
    createPost,
    allPosts,
    postsById,
    commetPost,
    saveComment,
    listPostsByUser,
    updatePost,
  };
};
