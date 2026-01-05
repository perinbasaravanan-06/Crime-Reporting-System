import React from "react";
import { useAdmin } from "../../../Context/AdminContext";

const UserOverview = () => {
  const {
    totalUsers,
    totalCrimes,
    totalMissing,
    totalEvidence,
  } = useAdmin();

  return (
    <div className="user-overview">
      <div className="stat-card">
        <h4>Total Users</h4>
        <span>{totalUsers}</span>
      </div>

      <div className="stat-card info1">
        <h4>Total Crime Reports</h4>
        <span>{totalCrimes}</span>
      </div>

      <div className="stat-card missing">
        <h4>Total Missing Reports</h4>
        <span>{totalMissing}</span>
      </div>

      <div className="stat-card success">
        <h4>Total Evidence Submitted</h4>
        <span>{totalEvidence}</span>
      </div>
    </div>
  );
};

export default UserOverview;
