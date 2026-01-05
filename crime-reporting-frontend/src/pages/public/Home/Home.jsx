import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../../Context/RoleContext.jsx";
import { useAuth } from "../../../auth/AuthContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { loginRole } = useRole(); // UI-selected role
  const { user } = useAuth();

  // 🔐 JWT-safe derived values
  const authUser = user;
  const role = authUser?.role;

  const goToLogin = () => {
    navigate(loginRole === "POLICE" ? "/login/police" : "/login/user");
  };

  // 🔐 Auto-redirect after login
  useEffect(() => {
    if (!role) return;

    navigate(
      role === "ADMIN"
        ? "/admin/dashboard"
        : role === "POLICE"
        ? "/police/dashboard"
        : "/user/dashboard",
      { replace: true }
    );
  }, [role, navigate]);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Crime Reporting & Missing Person Tracking System</h1>
        <p>
          An official digital initiative by the Government of Tamil Nadu to
          enable citizens to report crimes and missing persons securely and
          transparently.
        </p>

        <div className="hero-alert">
          🚨 <strong>Emergency?</strong> Call <strong>100 / 112</strong>{" "}
          immediately
        </div>

        <div className="hero-actions">
          <button onClick={goToLogin}>
            {loginRole === "POLICE" ? "Reported Crimes" : "Report Crime"}
          </button>

          <button onClick={goToLogin} className="secondary">
            {loginRole === "POLICE"
              ? "Reported Missing Persons"
              : "Report Missing Person"}
          </button>

          <button onClick={goToLogin} className="secondary">
            {loginRole === "POLICE" ? "View Evidence" : "Submit Evidence"}
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>What You Can Do</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>
              {loginRole === "POLICE"
                ? "📂 View Crime Reports"
                : "📝 Report Crime"}
            </h3>
            <p>
              {loginRole === "POLICE"
                ? "View and manage reported crime cases submitted by citizens."
                : "File crime complaints online, submit evidence securely, and track progress transparently."}
            </p>
          </div>

          <div className="feature-card">
            <h3>
              {loginRole === "POLICE"
                ? "📂 View Missing Person Cases"
                : "👤 Report Missing Person"}
            </h3>
            <p>
              {loginRole === "POLICE"
                ? "Access and verify missing person reports for investigation."
                : "Register missing person cases with photos and details for faster police assistance."}
            </p>
          </div>

          <div className="feature-card">
            <h3>🔍 Track Case Status</h3>
            <p>
              Receive updates and view the status of reported cases anytime.
            </p>
          </div>

          <div className="feature-card">
            <h3>👮 Police Case Management</h3>
            <p>
              Authorized police officials can verify reports and update case
              progress securely.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">1️⃣ Login</div>
          <div className="step">
            {loginRole === "POLICE"
              ? "2️⃣ Review Reports"
              : "2️⃣ Submit Report"}
          </div>
          <div className="step">
            {loginRole === "POLICE"
              ? "3️⃣ Update Status"
              : "3️⃣ Status Updates"}
          </div>
        </div>
      </section>

      {/* NOTICE */}
      <section className="notice">
        ⚠ False reporting or misuse of this system is a punishable offense under
        applicable Indian laws.
      </section>
    </div>
  );
};

export default Home;
