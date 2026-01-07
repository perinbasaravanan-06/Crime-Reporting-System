import React, { useState } from "react";
import "./SubmitEvidence.css";
import { useMissing } from "../../../Context/MissingContext.jsx";
import { useCrime } from "../../../Context/CrimeContext.jsx";
import {
  uploadEvidenceFile,
  submitCrimeEvidence,
  submitMissingEvidence,
} from "../../../api/evidenceApi.js";
import { useEvidence } from "../../../Context/EvidenceContext.jsx";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utils/toast.js";

const SubmitEvidence = () => {
  const { missingPersonsListById } = useMissing();
  const { crimesListById } = useCrime();
  const { fetchMyEvidence } = useEvidence();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    caseCategory: "",
    crimeType: "",
    caseId: "",
    backendId: null,
    description: "",
    file: null,
  });

  const cases = [
    ...crimesListById.map((c) => ({
      id: c.caseId,
      name: c.crimeType,
      category: "CRIME",
      backendId: c.crimeId,
      crimeType: c.crimeType,
    })),
    ...missingPersonsListById.map((m) => ({
      id: m.caseId,
      name: m.name,
      category: "MISSING",
      backendId: m.missingId,
    })),
  ];

  const filteredCases = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const selectCase = (item) => {
    if (loading) return;
    setFormData((prev) => ({
      ...prev,
      caseCategory: item.category,
      crimeType: item.crimeType || "",
      caseId: item.id,
      backendId: item.backendId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, file: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      caseCategory: "",
      crimeType: "",
      caseId: "",
      backendId: null,
      description: "",
      file: null,
    });
    setSearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file || !formData.backendId || loading) return;

    setLoading(true);

    const slowToast = setTimeout(() => {
      toastWarning("This may take a while, please wait...");
    }, 10000);

    try {
      const uploadRes = await uploadEvidenceFile(formData.file);

      const payload = {
        fileName: uploadRes.fileName,
        fileType: uploadRes.fileType,
        fileUrl: uploadRes.fileUrl,
        description: formData.description,
      };

      if (formData.caseCategory === "CRIME") {
        await submitCrimeEvidence(formData.backendId, payload);
      } else {
        await submitMissingEvidence(formData.backendId, payload);
      }

      clearTimeout(slowToast);
      fetchMyEvidence();
      toastSuccess("Evidence submitted successfully");
      resetForm();
    } catch (err) {
      clearTimeout(slowToast);
      console.error(err);
      toastError("Evidence submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="evidence-page">
      <div className="page-container">
        {/* LEFT */}
        <div className="evidence-form-card">
          <h2>Submit Evidence</h2>

          <form onSubmit={handleSubmit}>
            <select
              name="caseCategory"
              value={formData.caseCategory}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select category</option>
              <option value="CRIME">Crime</option>
              <option value="MISSING">Missing Person</option>
            </select>

            {formData.caseCategory === "CRIME" && (
              <select
                name="crimeType"
                value={formData.crimeType}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select crime type</option>
                <option value="THEFT">Theft</option>
                <option value="ASSAULT">Assault</option>
                <option value="MURDER">Murder</option>
                <option value="CYBER_CRIME">Cyber Crime</option>
              </select>
            )}

            <input value={formData.caseId} readOnly />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              type="file"
              accept="image/*,video/*,.pdf"
              onChange={handleFileChange}
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
                "Submit Evidence"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="evidence-case-list">
          <h3>Reported Cases</h3>

          <input
            className="search"
            placeholder="Search by name or case ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
          />

          <div className="case-scroll">
            {filteredCases.map((item) => (
              <div
                key={item.id}
                className="case-card"
                onClick={() => selectCase(item)}
              >
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.id}</p>
                </div>

                <span className={`badge-${item.category.toLowerCase()}`}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitEvidence;
