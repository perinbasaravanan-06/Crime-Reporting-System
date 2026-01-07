import React, { useState } from "react";
import "./ReportCrime.css";
import { createCrime } from "../../../api/crimeApi";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useCrime } from "../../../Context/CrimeContext.jsx";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utils/toast.js";

const ReportCrime = () => {
  const { user } = useAuth();
  const { fetchCrimesListById } = useCrime();

  const userId = user?.userId;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    crimeType: "",
    incidentDate: "",
    incidentTime: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    suspectDetails: "",
  });

  const resetForm = () => {
    setFormData({
      crimeType: "",
      incidentDate: "",
      incidentTime: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
      suspectDetails: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || loading) return;

    setLoading(true);

    const slowToast = setTimeout(() => {
      toastWarning("This may take a while, please wait...");
    }, 10000);

    const crimePayload = {
      crimeType: formData.crimeType,
      description: formData.description,
      location: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };

    try {
      await createCrime(crimePayload);
      clearTimeout(slowToast);

      fetchCrimesListById();
      toastSuccess("Crime reported successfully");
      resetForm();
    } catch (error) {
      clearTimeout(slowToast);
      console.error(error);
      toastError("Failed to report crime");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-crime-page">
      <div className="report-crime-card">
        <h2>Report a Crime</h2>
        <p className="info">
          Provide accurate details. False reporting is punishable by law.
        </p>

        <form onSubmit={handleSubmit}>
          <select
            name="crimeType"
            value={formData.crimeType}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select Crime Type</option>
            <option value="THEFT">Theft</option>
            <option value="ROBBERY">Robbery</option>
            <option value="CYBER CRIME">Cyber Crime</option>
            <option value="KIDNAPPING">Kidnapping</option>
            <option value="ASSAULT">Assault</option>
            <option value="MURDER">Murder</option>
          </select>

          <div className="row">
            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="time"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <input
            name="address"
            placeholder="Incident Address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              disabled={loading}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <textarea
            name="description"
            placeholder="Describe the incident"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <textarea
            name="suspectDetails"
            placeholder="Suspect details (optional)"
            value={formData.suspectDetails}
            onChange={handleChange}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Submitting...
              </span>
            ) : (
              "Submit Crime Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportCrime;
