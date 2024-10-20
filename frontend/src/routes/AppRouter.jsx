import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { useValidators } from "../hooks/useValidators";
import { Toaster } from "react-hot-toast";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();

  return (
    <>
      <Routes>
        {/* Public routes */}
        {!isUserAuthenticated() ? (
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login-user" element={<Login />} />
            <Route path="/register-user" element={<Register />} />
            <Route path="*" element={<Navigate to="/login-user" />} /> */}
          </>
        ) : (
          // Private routes
          <Route>
            {/* <Route path="/authLayout" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} /> */}
          </Route>
        )}
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
