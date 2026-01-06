import React, { useState } from "react";
import "./LoginUser.css";
import { Link, useNavigate } from "react-router-dom";
import { normalLoginApi } from "../../../../api/authApi";
import { useAuth } from "../../../../auth/AuthContext";
import { toastError, toastSuccess, toastWarning } from "../../../../utils/toast";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true); //  start loading
    const slowToast = setTimeout(() => {
      toastWarning("This may take a while, please wait...");
    }, 7000);
    try {
      const res = await normalLoginApi(email, password);
      clearTimeout(slowToast);
      login(res.data);
      toastSuccess("Login successful");
      navigate("/user/dashboard", { replace: true });
    } catch {
      toastError("Login failed");
      setLoading(false); // stop loading on error
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
            id="email"
    name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <input
            id="password"
    name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Signing in...
                </span>
              ) : (
                "SIGN IN"
              )}
            </button>
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
