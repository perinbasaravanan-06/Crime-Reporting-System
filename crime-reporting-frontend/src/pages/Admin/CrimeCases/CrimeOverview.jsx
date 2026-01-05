import React from "react";
import { useAdmin } from "../../../Context/AdminContext";

const CrimeOverview = () => {
  const {
    totalCrimes,
    pendingCrimeCount,
    underInvestigationCrimeCount,
    solvedCrimeCount
  } = useAdmin();

  return (
    <div className="crime-overview">
      <div className="stat-card">
        <h4>Total Cases</h4>
        <span>{totalCrimes}</span>
      </div>

      <div className="stat-card warning">
        <h4>Pending</h4>
        <span>{pendingCrimeCount}</span>
      </div>

      <div className="stat-card info1">
        <h4>Under Investigation</h4>
        <span>{underInvestigationCrimeCount}</span>
      </div>

      <div className="stat-card success">
        <h4>Closed</h4>
        <span>{solvedCrimeCount}</span>
      </div>
    </div>
  );
};

export default CrimeOverview;
