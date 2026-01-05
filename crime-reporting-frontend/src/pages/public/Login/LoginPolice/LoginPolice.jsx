import React, { useState } from "react";
import "./LoginPolice.css";
import { Link, useNavigate } from "react-router-dom";
import { policeLoginApi } from "../../../../api/authApi";
import { useAuth } from "../../../../auth/AuthContext";
import { toastSuccess, toastError } from "../../../../utils/toast";

const LoginPolice = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await policeLoginApi(email, password);
      login(res.data);
      toastSuccess("Login successful");
      navigate("/police/dashboard", { replace: true });
    } catch {
      toastError("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-glass">
        {/* LEFT */}
        <div className="login-left">
          <h2>Police Login</h2>
          <p>Authorized personnel only</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Official Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">SIGN IN</button>
          </form>

          <span className="signup-text">
            New officer?
            <Link to="/register/police"> Register</Link>
          </span>

          <div className="approval-note">
            Login allowed only after admin approval
          </div>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Tamil Nadu Police</h2>
          <p>
            Secure access for police officials to verify reports, manage cases,
            and update investigation status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPolice;
