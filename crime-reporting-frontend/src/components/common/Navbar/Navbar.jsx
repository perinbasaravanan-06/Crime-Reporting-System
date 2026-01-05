import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useRole } from "../../../Context/RoleContext.jsx";
import { useTheme } from "../../../Context/ThemeContext.jsx";
import tnPoliceLogo from "../../../assets/images/tn-police-logo.png";
import { toastInfo } from "../../../utils/toast.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { loginRole, updateRole } = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // 🔐 JWT-safe user
  const authUser = user;
  const role = user?.role;

  const handleLogout = () => {
    logout();
    toastInfo("Logout successfully");
    navigate("/");
  };

  const goToLogin = () => {
    navigate(loginRole === "POLICE" ? "/login/police" : "/login/user");
  };

  const goToRegister = () => {
    navigate(loginRole === "POLICE" ? "/register/police" : "/register/user");
  };

  const pageHandler = () => {
    if (!authUser) return navigate("/");

    if (role === "USER") navigate("/user/dashboard");
    else if (role === "POLICE") navigate("/police/dashboard");
    else if (role === "ADMIN") navigate("/admin/dashboard");
    else {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="navbar-fixed-wrapper">
      <header className="gov-navbar">
        <div className="gov-right" onClick={pageHandler}>
          <img src={tnPoliceLogo} className="gov-logo" alt="TN Police" />
          <span className="gov-title">Crime Reporting System</span>
        </div>

        <div className="gov-left">
          {/* THEME TOGGLE BUTTON */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              // Sun Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              // Moon Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <span className="gov-helpline">
            Helpline: <strong>100</strong>
          </span>

          {/* ================= NOT LOGGED IN ================= */}
          {!authUser && (
            <>
              <div className="login-toggle">
                <button
                  className={
                    loginRole === "USER"
                      ? "toggle-btn active"
                      : "toggle-btn"
                  }
                  onClick={() => updateRole("USER")}
                >
                  Citizen
                </button>

                <button
                  className={
                    loginRole === "POLICE"
                      ? "toggle-btn active police"
                      : "toggle-btn police"
                  }
                  onClick={() => updateRole("POLICE")}
                >
                  Police
                </button>
              </div>

              <button className="gov-link" onClick={goToLogin}>
                LOGIN
              </button>
              <button className="gov-link" onClick={goToRegister}>
                REGISTER
              </button>
            </>
          )}

          {/* ================= LOGGED IN ================= */}
          {authUser && (
            <>
              <span className="gov-user">{authUser.name}</span>
              <button className="gov-link logout-btn" onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
