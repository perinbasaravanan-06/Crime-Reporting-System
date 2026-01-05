import React from "react";
import { useAdmin } from "../../../Context/AdminContext";

const EvidenceOverview = () => {
  const{totalEvidence,pendingEvidenceCount,approvedEvidenceCount,rejectedEvidenceCount} = useAdmin();
  return (
    <div className="evidence-overview">
      <div className="stat-card">
        <h4>Total Evidence</h4>
        <span>{totalEvidence}</span>
      </div>

      <div className="stat-card warning">
        <h4>Pending Review</h4>
        <span>{pendingEvidenceCount}</span>
      </div>

      <div className="stat-card success">
        <h4>Verified</h4>
        <span>{approvedEvidenceCount}</span>
      </div>

      <div className="stat-card danger">
        <h4>Rejected</h4>
        <span>{rejectedEvidenceCount}</span>
      </div>
    </div>
  );
};

export default EvidenceOverview;
