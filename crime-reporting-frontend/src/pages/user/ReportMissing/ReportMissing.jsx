import React, { useState } from "react";
import "./ReportMissing.css";
import {
  createMissingPersons,
  uploadMissingPersonImage,
} from "../../../api/missingApi.js";
import { useMissing } from "../../../Context/MissingContext.jsx";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utils/toast.js";

const ReportMissing = () => {
  const { fetchMissingPersonsById } = useMissing();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    personName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    lastSeenDate: "",
    lastSeenTime: "",
    lastSeenLocation: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    identificationMarks: "",
    photo: null,
  });

  const resetForm = () => {
    setFormData({
      personName: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      lastSeenDate: "",
      lastSeenTime: "",
      lastSeenLocation: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
      identificationMarks: "",
      photo: null,
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setFormData({ ...formData, photo: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const slowToast = setTimeout(() => {
      toastWarning("This may take a while, please wait...");
    }, 10000);

    try {
      // 1️⃣ Upload image
      const imageRes = await uploadMissingPersonImage(formData.photo);
      const photoUrl = imageRes.data;

      const lastSeenAt = `${formData.lastSeenDate}T${formData.lastSeenTime}`;

      // 2️⃣ Prepare payload
      const payload = {
        name: formData.personName,
        age: Number(formData.age),
        gender: formData.gender,
        height: Number(formData.height),
        weight: Number(formData.weight),
        lastSeenDate: lastSeenAt,
        lastSeenLocation: formData.lastSeenLocation,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        description: formData.description,
        identificationMarks: formData.identificationMarks,
        photoUrl: photoUrl,
      };

      // 3️⃣ Submit
      await createMissingPersons(payload);
      clearTimeout(slowToast);

      fetchMissingPersonsById();
      toastSuccess("Missing person reported successfully");
      resetForm();
    } catch (error) {
      clearTimeout(slowToast);
      console.error(error);
      toastError("Failed to report missing person");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-missing-page">
      <div className="report-missing-card">
        <h2>Report Missing Person</h2>
        <p className="info">
          Provide accurate details to help authorities take quick action.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="personName"
            placeholder="Missing Person Name"
            value={formData.personName}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <div className="row">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>

            <input
              type="number"
              name="height"
              placeholder="Height in cm"
              value={formData.height}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight in Kgs"
              value={formData.weight}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* PHOTO */}
          <div className="image-upload">
            <label>Upload Missing Person Photo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              disabled={loading}
            />

            {formData.photo && (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          {/* LAST SEEN */}
          <div className="row">
            <input
              type="date"
              name="lastSeenDate"
              value={formData.lastSeenDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="time"
              name="lastSeenTime"
              value={formData.lastSeenTime}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <input
            name="lastSeenLocation"
            placeholder="Last Seen Location"
            value={formData.lastSeenLocation}
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
            placeholder="How was the person missing?"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            name="identificationMarks"
            placeholder="Identification Marks"
            value={formData.identificationMarks}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner" />
                Submitting...
              </span>
            ) : (
              "Submit Missing Person Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportMissing;
