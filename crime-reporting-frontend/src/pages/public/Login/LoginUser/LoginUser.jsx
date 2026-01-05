import React, { useState } from "react";
import "./LoginUser.css";
import { Link, useNavigate } from "react-router-dom";
import { normalLoginApi } from "../../../../api/authApi";
import { useAuth } from "../../../../auth/AuthContext";
import { toastError, toastSuccess } from "../../../../utils/toast";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await normalLoginApi(email, password);
      login(res.data);
      toastSuccess("Login successful");
      navigate("/user/dashboard", { replace: true });
    } catch {
      toastError("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-glass">
        {/* LEFT */}
        <div className="login-left">
          <h2>Hello!</h2>
          <p>Sign in to your account</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
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
            Don’t have an account?
            <Link to="/register/user"> Create</Link>
          </span>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Welcome Back!</h2>
          <p>
            Login to continue accessing your dashboard and manage your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
