import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { useValidators } from "../hooks/useValidators";
import { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav/Nav";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Post } from "../pages/CreatePost/Post";
import { Profile } from "../pages/Profile/Profile";
import { useSelector } from "react-redux";
import { UpdateProfile } from "../pages/UpdateProfile/UpdateProfile";
import { PostDetails } from "../pages/PostDetails/PostDetails";
import { UpdatePost } from "../pages/UpdatePost/UpdatePost";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();
  const user = useSelector((state) => state.users.auth.user);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<Login />} />
        <Route path="/singup-user" element={<Register />} />
        <Route path="/create-posts" element={<Post />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
