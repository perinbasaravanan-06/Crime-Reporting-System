import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import { useRole } from "../../../Context/RoleContext";
import {
  toastSuccess,
  toastError,
  toastWarning,
} from "../../../utils/toast";

const Contact = () => {
  const { BASE_URL } = useRole();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const slowToast = setTimeout(() => {
      toastWarning("This may take a while, please wait...");
    }, 10000);

    try {
      await axios.post(`${BASE_URL}/api/contact`, form);
      clearTimeout(slowToast);

      toastSuccess("Message sent successfully");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      clearTimeout(slowToast);
      toastError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>
          Reach out for support, emergency assistance, or general enquiries
        </p>
      </div>

      {/* TOP ROW */}
      <div className="contact-cards three-column">
        <div className="contact-card">
          <h4>🚨 Emergency</h4>
          <p><strong>Police:</strong> 100</p>
          <p><strong>Emergency:</strong> 112</p>
          <p><strong>Women Helpline:</strong> 1091</p>
        </div>

        <div className="contact-card">
          <h4>📞 Support</h4>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> support@crimereporting.in</p>
          <p>Available 24×7</p>
        </div>

        <div className="contact-card">
          <h4>🏢 Office</h4>
          <p>Crime Reporting System</p>
          <p>Government Complex</p>
          <p>Chennai, Tamil Nadu</p>
          <p>India – 600001</p>
        </div>
      </div>

      {/* INFO + FORM */}
      <div className="contact-form-row">
        <div className="contact-info-card">
          <h4>ℹ️ Quick Information</h4>

          <div className="quick-info-list">
            <div className="quick-info-item">
              Use this form only for <strong>non-emergency</strong> queries
            </div>
            <div className="quick-info-item">
              For emergencies, call <strong>100 / 112</strong>
            </div>
            <div className="quick-info-item">
              This portal is monitored by authorized officials
            </div>
            <div className="quick-info-item">
              Evidence uploads are available after login
            </div>
            <div className="quick-info-item">
              Response time is within <strong>24 hours</strong>
            </div>
            <div className="quick-info-item warning">
              Misuse of this system is punishable under Indian law
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>✉️ Contact Form</h2>
          <p>We usually respond within 24 hours</p>

          <form onSubmit={submit}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="contact-footer">
        © 2025 Crime Reporting System • Public Safety & Trust
      </div>
    </div>
  );
};

export default Contact;
