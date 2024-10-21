import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";
import "./Module.scss";

export const Login = () => {
  const { status } = useSelector((state) => state.users);
  const user = useSelector((state) => state.users.auth.access_token);
  const { LoginUser } = useUserActions();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await LoginUser(formData);
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/"); // Redirige si el login fue exitoso
    }

    setFormData({ email: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-login">
      <div className="image-logo">
        <img src="/assets/images/faultfixer.png" alt="" />
      </div>
      <div className="login-content">
        <form className="form-login" onSubmit={handleSubmit}>
          <label className="title-input">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email"
          />

          <label className="title-input">Password</label>
          <div className="password-container">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="button-login"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Cargando..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};
