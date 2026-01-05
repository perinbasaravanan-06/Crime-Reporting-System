import React from "react";
import "./MissingCases.css";
import MissingOverview from "./MissingOverview.jsx";
import MissingTable from "./MissingTable.jsx";

const MissingCases = () => {
  return (
    <div className="admin-missing-cases">
      <div className="page-header">
        <h2>Missing Person Cases</h2>
        <p>Monitor and manage reported missing person cases</p>
      </div>

      <MissingOverview />
      <MissingTable />
    </div>
  );
};

export default MissingCases;
