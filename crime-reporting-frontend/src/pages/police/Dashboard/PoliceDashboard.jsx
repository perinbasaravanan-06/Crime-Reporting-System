import React from "react";
import "./PoliceDashboard.css";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import AssignedCasesTable from "./AssignedCasesTable";
import { usePolice } from "../../../Context/PoliceContext";

const PoliceDashboard = () => {
  const { user } = useAuth();
  const { crimeCases, missingCases, loading } = usePolice();
  const navigate = useNavigate();

  // 🔐 JWT-safe derived values
  const authUser = user;
  const officerName = authUser?.name;
  const officerRank = authUser?.rank;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="police-dashboard">
      <div className="dashboard-header">
        <h2>
          Welcome, {officerRank} {officerName}
        </h2>
        <p>Manage assigned cases and review evidence</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Assigned Crime Cases</h4>
          <span>{crimeCases.length}</span>
        </div>

        <div className="stat-card warning">
          <h4>Missing Cases</h4>
          <span>{missingCases.length}</span>
        </div>
      </div>

      <div className="quick-actions">
        <button onClick={() => navigate("/police/crime-cases")}>
          Crime Cases
        </button>
        <button
          className="secondary"
          onClick={() => navigate("/police/missing-cases")}
        >
          Missing Cases
        </button>
        <button onClick={() => navigate("/police/evidence")}>
          Evidences
        </button>
        <button onClick={() => navigate("/police/my-reports")}>
          My Reports
        </button>
      </div>

      <AssignedCasesTable
        title="Assigned Crime Cases"
        columns={["Case ID", "Crime Type", "Status", "Reported On"]}
        data={crimeCases}
      />

      <AssignedCasesTable
        title="Assigned Missing Cases"
        columns={["Case ID","Image", "Description", "Status", "Reported On"]}
        data={missingCases}
      />
    </div>
  );
};

export default PoliceDashboard;
