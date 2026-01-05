import React, { useState } from "react";
import "./LoginUser.css";
import { useNavigate, Link } from "react-router-dom";
import { normalLoginApi } from "../../../../api/authApi";
import { useAuth } from "../../../../auth/AuthContext";
import { toastError, toastSuccess } from "../../../../utils/toast";

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await normalLoginApi(email, password);

    const role = res.data.user.role;
    // ✅ FIX: build correct shape for AuthContext
    login(res.data);
    toastSuccess("Login successFull");
    if (role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  } catch (err) {
    console.error(err);
    toastError("Login Failed")
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT IMAGE */}
        <div
          className="login-image"
          style={{ backgroundImage: "url(/src/assets/images/citizen1.jpg)" }}
        >
          <div className="login-image-content"></div>
        </div>

        {/* RIGHT FORM */}
        <div className="login-form">
          <h2>Citizen Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
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
            New user? <Link to="/register/user">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
