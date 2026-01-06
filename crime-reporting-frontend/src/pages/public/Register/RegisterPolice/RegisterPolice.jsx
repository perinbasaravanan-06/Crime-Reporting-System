import React, { useState } from "react";
import "./RegisterPolice.css";
import { useNavigate, Link } from "react-router-dom";
import { registerPoliceApi } from "../../../../api/authApi";
import { toastError, toastSuccess } from "../../../../utils/toast";

const RegisterPolice = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // ✅ NEW

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    badgeNumber: "",
    rank: "",
    stationName: "",
    stationAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true); // start loader
    try {
      await registerPoliceApi(formData);
      toastSuccess(
        "Registration submitted successfully. Await admin approval."
      );
      navigate("/login/police");
    } catch (error) {
      toastError(
        error.response?.data || "Police registration failed. Try again."
      );
      setLoading(false); // stop loader on error
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-glass">
        {/* LEFT PANEL */}
        <div className="register-left">
          <h2>Police Registration</h2>
          <p>
            Official registration portal for Tamil Nadu Police officers.
            Access will be granted only after admin verification.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="register-form">
          <h3>Create Police Account</h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                name="name"
                placeholder="Officer Name"
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                name="badgeNumber"
                placeholder="Badge Number"
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Official Email"
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              disabled={loading}
            />

            <select
              name="rank"
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Rank</option>
              <option value="CONSTABLE">Constable</option>
              <option value="HEAD CONSTABLE">Head Constable</option>
              <option value="SUB INSPECTOR">Sub Inspector</option>
              <option value="INSPECTOR">Inspector</option>
              <option value="ASSISTANT COMMISSIONER">
                Assistant Commissioner
              </option>
              <option value="COMMISSIONER">Commissioner</option>
            </select>

            <input
              name="stationName"
              placeholder="Station Name"
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              name="stationAddress"
              placeholder="Station Address"
              onChange={handleChange}
              disabled={loading}
            />

            <div className="row">
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                disabled={loading}
              />
              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="row">
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                disabled={loading}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="switch">
            Already registered? <Link to="/login/police">Login</Link>
          </p>

          <div className="approval-note">
            Login allowed only after admin approval
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPolice;
