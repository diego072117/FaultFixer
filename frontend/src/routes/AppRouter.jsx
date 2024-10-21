import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { useValidators } from "../hooks/useValidators";
import { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav/Nav";
import { Login } from "../pages/Login/Login";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<Login />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
