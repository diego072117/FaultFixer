import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { useValidators } from "../hooks/useValidators";
import { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav/Nav";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<Login />} />
        <Route path="/singup-user" element={<Register />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
