import React from "react";
import "./Footer.css";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useRole } from "../../../Context/RoleContext.jsx";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useAuth();
  const { loginRole } = useRole();

  // 🔐 JWT-safe derived user
  const authUser = user;
  const role = user?.role;

  return (
    <footer className="modern-footer">
      {/* TOP GRID */}
      <div className="footer-grid">
        {/* ABOUT */}
        <div className="footer-brand">
          <h2>Crime Reporting System</h2>
          <p>
            An official digital platform by the Government of Tamil Nadu to
            report crimes, track missing persons, and assist law enforcement
            agencies in maintaining public safety.
          </p>
        </div>

        {/* DYNAMIC LINKS */}
        <div className="footer-column">
          <h4>QUICK LINKS</h4>
          <ul>
            {/* ================= PUBLIC ================= */}
            {!authUser && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>

                {loginRole === "POLICE" ? (
                  <>
                    <li>
                      <Link to="/login/police">Police Login</Link>
                    </li>
                    <li>
                      <Link to="/register/police">Police Register</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login/user">Login</Link>
                    </li>
                    <li>
                      <Link to="/register/user">Register</Link>
                    </li>
                  </>
                )}

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}

            {/* ================= USER ================= */}
            {authUser && role === "USER" && (
              <>
                <li>
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/user/report-crime">Report Crime</Link>
                </li>
                <li>
                  <Link to="/user/report-missing">Missing Person</Link>
                </li>
                <li>
                  <Link to="/user/my-reports">My Reports</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}

            {/* ================= POLICE ================= */}
            {authUser && role === "POLICE" && (
              <>
                <li>
                  <Link to="/police/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/police/crime-cases">Crime Cases</Link>
                </li>
                <li>
                  <Link to="/police/missing-cases">Missing Cases</Link>
                </li>
                <li>
                  <Link to="/police/evidence">Evidences</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}
            {authUser && role === "ADMIN" && (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/users">Users</Link>
                </li>
                <li>
                  <Link to="/admin/police">Police</Link>
                </li>
                <li>
                  <Link to="/admin/crimes">Crime Cases</Link>
                </li>
                <li>
                  <Link to="/admin/missing-cases">Missing Cases</Link>
                </li>
                <li>
                  <Link to="/admin/evidence">Evidence</Link>
                </li>
                 <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* HELP */}
        <div className="footer-column">
          <h4>HELP & SUPPORT</h4>
          <ul>
            <li>
              Emergency: <strong>100 / 112</strong>
            </li>
            <li>Email: support@tnpolice.gov.in</li>
            <li>24 × 7 Citizen Support</li>
            <li>
              <a
                href="https://eservices.tnpolice.gov.in"
                target="_blank"
                rel="noreferrer"
              >
                Tamil Nadu Police Portal
              </a>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div className="footer-column">
          <h4>IMPORTANT</h4>
          <p className="footer-note">
            This portal is strictly for lawful reporting. Misuse of this system
            is punishable under applicable laws.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="footer-divider" />

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Government of Tamil Nadu. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
