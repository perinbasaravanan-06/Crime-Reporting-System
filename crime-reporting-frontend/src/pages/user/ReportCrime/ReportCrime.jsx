import React, { useState } from "react";
import "./ReportCrime.css";
import { createCrime } from "../../../api/crimeApi";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useCrime } from "../../../Context/CrimeContext.jsx";
import { toastError, toastSuccess } from "../../../utils/toast.js";

const ReportCrime = () => {
  const { user } = useAuth();
  const{fetchCrimesListById}  = useCrime();

  // 🔐 JWT-safe derived value (recommended pattern)
  const userId = user?.userId;

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

    if (!userId) {
      alert("User not authenticated");
      return;
    }

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
      fetchCrimesListById();
      toastSuccess("Crime reported successfully");
      resetForm();
    } catch (error) {
      console.error(error);
      toastError("Failed to report crime");
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
            />
            <input
              type="time"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="address"
            placeholder="Incident Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Describe the incident"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="suspectDetails"
            placeholder="Suspect details (optional)"
            value={formData.suspectDetails}
            onChange={handleChange}
          />

          <button type="submit">Submit Crime Report</button>
        </form>
      </div>
    </div>
  );
};

export default ReportCrime;
