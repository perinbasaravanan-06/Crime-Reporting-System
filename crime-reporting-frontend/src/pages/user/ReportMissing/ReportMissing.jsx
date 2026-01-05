import React, { useState } from "react";
import "./ReportMissing.css";
import {
  createMissingPersons,
  uploadMissingPersonImage,
} from "../../../api/missingApi.js";
import { useMissing } from "../../../Context/MissingContext.jsx";
import { toastError, toastSuccess } from "../../../utils/toast.js";

const ReportMissing = () => {
  const{fetchMissingPersonsById} = useMissing();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Upload image
      const imageRes = await uploadMissingPersonImage(formData.photo);
      const photoUrl = imageRes.data;
      console.log(photoUrl);
      const lastSeenAt = `${formData.lastSeenDate}T${formData.lastSeenTime}`;

      // 2️⃣ Prepare JSON payload
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

      // 3️⃣ Submit missing person (🔐 JWT FIX HERE)
      await createMissingPersons(payload);
      fetchMissingPersonsById();
      toastSuccess("Missing person reported successfully");
      resetForm();
    } catch (error) {
      console.error(error);
      toastError("Failed to report missing person");
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
          />

          <div className="row">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
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
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight in Kgs"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          {/* PHOTO UPLOAD */}
          <div className="image-upload">
            <label>Upload Missing Person Photo *</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
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
            />
            <input
              type="time"
              name="lastSeenTime"
              value={formData.lastSeenTime}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="lastSeenLocation"
            placeholder="Last Seen Location"
            value={formData.lastSeenLocation}
            onChange={handleChange}
            required
          />

          {/* LOCATION */}
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

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="How Was the person Missing"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            name="identificationMarks"
            placeholder="Identification Marks"
            value={formData.identificationMarks}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Missing Person Report</button>
        </form>
      </div>
    </div>
  );
};

export default ReportMissing;
