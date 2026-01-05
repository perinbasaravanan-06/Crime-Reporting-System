import React from "react";
import "./DetailsModal.css";
import { useRole } from "../../../Context/RoleContext";

const DetailsModal = ({ open, onClose, title, data, type }) => {
  const { BASE_URL } = useRole();

  if (!open || !data) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          {/* ===== IMAGE PREVIEW ===== */}
          {(type === "MISSING" && data.photoUrl) ||
          (type === "EVIDENCE" && data.fileType === "IMAGE") ? (
            <img
              src={`${BASE_URL}${type === "MISSING" ? data.photoUrl : data.fileUrl}`}
              alt="Preview"
              className="modal-image"
            />
          ) : null}

          {/* ===== DETAILS ===== */}
          <ul className="details-list">
            {Object.entries(data).map(([key, value]) =>
              typeof value === "object" ? null : (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
