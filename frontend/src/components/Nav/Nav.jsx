import { Link } from "react-router-dom";
import { useValidators } from "../../hooks/useValidators";
import { useUserActions } from "../../hooks/useUserActions";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const Nav = () => {
  const { LogoutUser } = useUserActions();
  const { isUserAuthenticated } = useValidators();
  const user = useSelector((state) => state.users.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    LogoutUser();
  };

  // const handleClickOutside = (event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setIsMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <p className="">FaultFixer</p>
          {/* <img src="logo.png" alt="Logo" /> */}
        </Link>

        {isUserAuthenticated() && (
          <div className="user-auth-nav">
            <div className="info-user" onClick={toggleMenu}>
              <img
                src={
                  user.avatar
                    ? `${VITE_URL_API_IMG}/${user.avatar}`
                    : "/assets/images/profile-placeholder.svg"
                }
                alt=""
                className="info-user-img"
              />
            </div>
            {isMenuOpen && (
              <div className="dropdown-menu" ref={menuRef}>
                <div className="info-user-nav">
                  <img
                    src={
                      user.avatar
                        ? `${VITE_URL_API_IMG}/${user.avatar}`
                        : "/assets/images/profile-placeholder.svg"
                    }
                    alt=""
                    className="info-user-img"
                  />
                  <p>{user.username}</p>
                </div>
                <Link to={`/profile/${user.id}`} className="dropdown-item">
                  Perfil
                </Link>
                <Link to="/creator-dashboard" className="dropdown-item">
                  Publicaciones
                </Link>
                <Link to="/create-posts" className="dropdown-item">
                  Nueva Publicacion
                </Link>

                <button onClick={handleLogout} className="dropdown-item logout">
                  <IoMdLogOut /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
        {!isUserAuthenticated() && (
          <div className="navbar__auth">
            <Link to="/login-user" className="btn btn--login">
              Log in
            </Link>
            <Link to="/singup-user" className="btn btn--signup">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
