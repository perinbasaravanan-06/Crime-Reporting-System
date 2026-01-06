import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavBar.css";
import { useAuth } from "../../../auth/AuthContext.jsx";

const AdminNavBar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // 🔒 Only ADMIN can see this navbar
  if (!user || user.role !== "ADMIN") return null;

  return (
    <nav className="admin-nav">
      {/* 🔥 Brand / Title */}

      {/* 🍔 Burger Icon (Mobile Only) */}
      <div
        className={`burger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔗 Links */}
      <div className={`admin-links ${open ? "show" : ""}`}>
        <NavLink to="/admin/dashboard" className="admin-link" onClick={() => setOpen(false)}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className="admin-link" onClick={() => setOpen(false)}>
          Users
        </NavLink>

        <NavLink to="/admin/police" className="admin-link" onClick={() => setOpen(false)}>
          Police
        </NavLink>

        <NavLink to="/admin/crimes" className="admin-link" onClick={() => setOpen(false)}>
          Crime Cases
        </NavLink>

        <NavLink to="/admin/missing-cases" className="admin-link" onClick={() => setOpen(false)}>
          Missing Cases
        </NavLink>

        <NavLink to="/admin/evidence" className="admin-link" onClick={() => setOpen(false)}>
          Evidence
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavBar;
