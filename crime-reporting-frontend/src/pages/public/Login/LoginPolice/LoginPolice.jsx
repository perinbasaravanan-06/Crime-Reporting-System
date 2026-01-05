import React, { useState } from "react";
import "./LoginPolice.css";
import { useNavigate, Link } from "react-router-dom";
import { policeLoginApi } from "../../../../api/authApi";
import { useAuth } from "../../../../auth/AuthContext";
import { toastSuccess, toastError } from "../../../../utils/toast";
const LoginPolice = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await policeLoginApi(email, password);

      // 🔐 JWT stored here
      login(res.data);
      toastSuccess("Login SuccessFull")
      navigate("/police/dashboard", { replace: true });
    } catch (err) {
      toastError("Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div
          className="login-image"
          style={{ backgroundImage: "url(/src/assets/images/police.jpg)" }}
        >
          <div className="login-image-content">
            <h3>Tamil Nadu Police Portal</h3>
            <p>Authorized personnel login</p>
          </div>
        </div>

        <div className="login-form">
          <h2>Police Login</h2>

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

            <button type="submit">Login</button>
          </form>

          <p className="switch">
            New officer? <Link to="/register/police">Register</Link>
          </p>

          <p className="note">⚠ Login allowed only after admin approval</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPolice;
