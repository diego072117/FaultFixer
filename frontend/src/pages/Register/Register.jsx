import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";
import "./Module.scss";

export const Register = () => {
  const navigate = useNavigate();
  const { NewUser } = useUserActions();
  const { status } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await NewUser(formData);
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/login-user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-register">
      <div className="image-logo-register">
        <img src="/assets/images/faultfixer.png" alt="" />
      </div>
      <div className="register-content">
        <form className="form-register" onSubmit={handleSubmit}>
          <label className="title-input">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your name"
          />
          <label className="title-input">UserName</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your username"
          />
          <label className="title-input">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email"
          />
          <label className="title-input">Phone</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
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
