import React from "react";
import "./Evidence.css";
import EvidenceOverview from "./EvidenceOverview.jsx";
import EvidenceTable from "./EvidenceTable.jsx";

const Evidence = () => {
  return (
    <div className="admin-evidence">
      <div className="page-header">
        <h2>Evidence Management</h2>
        <p>Review and verify submitted evidences</p>
      </div>

      <EvidenceOverview />
      <EvidenceTable />
    </div>
  );
};

export default Evidence;
