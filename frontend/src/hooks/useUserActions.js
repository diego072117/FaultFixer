import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllUsersAsync,
  getUserByIdAsync,
  loginUserAsync,
  logout,
  registerUserAsync,
  updateUserAsync,
} from "../store/users/slice";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NewUser = async (userData) => {
    return dispatch(registerUserAsync(userData));
  };

  const userbyId = async (id) => {
    dispatch(getUserByIdAsync(id));
  };

  const allUsers = () => {
    dispatch(getAllUsersAsync());
  };

  const updateUser = async (userData) => {
    return dispatch(updateUserAsync(userData));
  };

  const LoginUser = async (userData) => {
    return dispatch(loginUserAsync(userData));
  };

  const LogoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return { NewUser, userbyId, allUsers, LoginUser, LogoutUser, updateUser };
};
