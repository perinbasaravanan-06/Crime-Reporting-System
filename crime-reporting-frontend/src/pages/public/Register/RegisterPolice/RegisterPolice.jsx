import React, { useState } from "react";
import "./RegisterPolice.css";
import { useNavigate, Link } from "react-router-dom";
import { registerPoliceApi } from "../../../../api/authApi";
import { toastError, toastSuccess } from "../../../../utils/toast";

const RegisterPolice = () => {
  const navigate = useNavigate();

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
              />
              <input
                name="badgeNumber"
                placeholder="Badge Number"
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Official Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <select name="rank" onChange={handleChange} required>
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
            />

            <input
              name="stationAddress"
              placeholder="Station Address"
              onChange={handleChange}
            />

            <div className="row">
              <input name="city" placeholder="City" onChange={handleChange} />
              <input name="state" placeholder="State" onChange={handleChange} />
            </div>

            <div className="row">
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Create Account</button>
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
