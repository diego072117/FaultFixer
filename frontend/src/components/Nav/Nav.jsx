import { Link } from "react-router-dom";
import { useValidators } from "../../hooks/useValidators";
import { useUserActions } from "../../hooks/useUserActions";
import { useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import "./Module.scss";

export const Nav = () => {
  const { LogoutUser } = useUserActions();
  const { isUserAuthenticated } = useValidators();
  const user = useSelector((state) => state.users.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    LogoutUser();
  };

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
                src="/assets/images/profile-placeholder.svg"
                alt=""
                className="info-user-img"
              />
            </div>
            {isMenuOpen && (
              <div className="dropdown-menu">
                <div className="info-user-nav">
                  <img
                    src="/assets/images/profile-placeholder.svg"
                    alt=""
                    className="info-user-img"
                  />
                  <p>{user.username}</p>
                </div>
                <Link to="/profile" className="dropdown-item">
                  Perfil
                </Link>
                <Link to="/creator-dashboard" className="dropdown-item">
                  Publicaciones
                </Link>
                <Link className="dropdown-item">Ajustes</Link>

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
            <button className="btn btn--signup">Sign up</button>
          </div>
        )}
      </div>
    </nav>
  );
};
