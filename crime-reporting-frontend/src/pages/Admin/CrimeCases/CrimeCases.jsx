import React from "react";
import "./CrimeCases.css";
import CrimeOverview from "./CrimeOverview.jsx";
import CrimeTable from "./CrimeTable.jsx";

const CrimeCases = () => {
  return (
    <div className="admin-crime-cases">
      <div className="page-header">
        <h2>Crime Cases</h2>
        <p>Monitor and manage reported crime cases</p>
      </div>

      <CrimeOverview />
      <CrimeTable />
    </div>
  );
};

export default CrimeCases;
