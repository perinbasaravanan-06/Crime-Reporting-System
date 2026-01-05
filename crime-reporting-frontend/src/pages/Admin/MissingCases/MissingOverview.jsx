import React from "react";
import { useAdmin } from "../../../Context/AdminContext";

const MissingOverview = () => {
  const {
    totalMissing,
    pendingMissingCount,
    underInvestigationMissingCount,
    foundMissingCount
  } = useAdmin();

  return (
    <div className="missing-overview">
      <div className="stat-card">
        <h4>Total Missing Cases</h4>
        <span>{totalMissing}</span>
      </div>

      <div className="stat-card warning">
        <h4>Pending</h4>
        <span>{pendingMissingCount}</span>
      </div>

      <div className="stat-card info1">
        <h4>Under Investigation</h4>
        <span>{underInvestigationMissingCount}</span>
      </div>

      <div className="stat-card success">
        <h4>Found</h4>
        <span>{foundMissingCount}</span>
      </div>
    </div>
  );
};

export default MissingOverview;
