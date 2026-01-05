import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavBar.css";
import { useAuth } from "../../../auth/AuthContext.jsx";

const AdminNavBar = () => {
  const { user } = useAuth();

  // 🔐 JWT-safe user

  // 🔒 Only ADMIN can see this navbar
  if (!user || user.role !== "ADMIN") return null;

  return (
    <nav className="admin-nav">
      <NavLink to="/admin/dashboard" className="admin-link">
        Dashboard
      </NavLink>

      <NavLink to="/admin/users" className="admin-link">
        Users
      </NavLink>

      <NavLink to="/admin/police" className="admin-link">
        Police
      </NavLink>

      <NavLink to="/admin/crimes" className="admin-link">
        Crime Cases
      </NavLink>

      <NavLink to="/admin/missing-cases" className="admin-link">
        Missing Cases
      </NavLink>

      <NavLink to="/admin/evidence" className="admin-link">
        Evidence
      </NavLink>
    </nav>
  );
};

export default AdminNavBar;
