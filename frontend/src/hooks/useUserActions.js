import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUserAsync,
  logout,
  registerUserAsync,
} from "../store/users/slice";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NewUser = async (userData) => {
    return dispatch(registerUserAsync(userData));
  };

  const LoginUser = async (userData) => {
    return dispatch(loginUserAsync(userData));
  };

  const LogoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return { NewUser, LoginUser, LogoutUser };
};
