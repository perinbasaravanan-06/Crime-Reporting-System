import React, { useState } from "react";
import "./RegisterUser.css";
import { useNavigate, Link } from "react-router-dom";
import { registerUserApi } from "../../../../api/authApi";
import { toastError, toastSuccess } from "../../../../utils/toast";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
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
      await registerUserApi(formData);
      toastSuccess("Registration successful. Please login.");
      navigate("/login/user");
    } catch (error) {
      toastError(error.response?.data || "User registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-glass">
        {/* LEFT DARK PANEL */}
        <div className="register-left">
          <h2>Citizen Registration</h2>
          <p>
            Create an official account to report crimes, submit evidence, and
            track case status securely.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="register-form">
          <h3>Create an Account</h3>

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="address" placeholder="Address" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} />
            <input name="state" placeholder="State" onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} />

            <button type="submit">Create Account</button>
          </form>

          <p className="switch">
            Already have an account? <Link to="/login/user">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
