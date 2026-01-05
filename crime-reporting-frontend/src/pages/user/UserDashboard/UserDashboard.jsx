import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import UserReportsTable from "./UserReportsTable.jsx";
import { useCrime } from "../../../Context/CrimeContext.jsx";
import { useMissing } from "../../../Context/MissingContext.jsx";
import { useEvidence } from "../../../Context/EvidenceContext.jsx";

const UserDashboard = () => {
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { crimesListById } = useCrime();
  const { missingPersonsListById } = useMissing();
  const { evidenceListByUser } = useEvidence();
  return (
    <div className="user-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Welcome, {user?.name}</h2>
        <p>Track your reports and submit new cases</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Crime Reports</h4>
          <span>{crimesListById.length}</span>
        </div>

        <div className="stat-card warning">
          <h4>Missing Reports</h4>
          <span>{missingPersonsListById.length}</span>
        </div>

        <div className="stat-card success">
          <h4>Evidence Submitted</h4>
          <span>{evidenceListByUser.length}</span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button onClick={() => navigate("/user/report-crime")}>
          ➕ Report Crime
        </button>

        <button
          className="secondary"
          onClick={() => navigate("/user/report-missing")}
        >
          ➕ Report Missing Person
        </button>

        <button onClick={() => navigate("/user/submit-evidence")}>
          📎 Submit Evidence
        </button>

        <button
          className="outline"
          onClick={() => navigate("/user/my-reports")}
        >
          📂 View My Reports
        </button>
      </div>

      {/* TABLES */}
      <UserReportsTable
        title="Crime Reports"
        type="CRIME"
        columns={["Case ID", "Crime Type", "Status", "Reported On"]}
        data={crimesListById.map((c) => ({
          id: c.caseId,
          type: c.crimeType,
          status: c.status,
          date: new Date(c.reportedAt).toLocaleDateString(),
         // __raw: c,
        }))}
      />

      <UserReportsTable
        title="Missing Person Reports"
        type= "MISSING"
        columns={["Case ID", "Image", "Name", "Status", "Reported On"]}
        data={missingPersonsListById.map((m) => ({
          id: m.caseId,
          image: m.photoUrl,
          name: m.name,
          status: m.status,
          date: new Date(m.reportedAt).toLocaleDateString(),
         // __raw: m, // 👈 IMPORTANT

        }))}
      />

      <UserReportsTable
        title="Evidence Submitted"
        //type="EVIDENCE"
        columns={["Evidence ID", "Case ID", "Preview", "Submitted On"]}
        data={evidenceListByUser.map((e) => ({
          id: e.evidenceCode,
          caseId: e.crime
            ? e.crime.caseId
            : e.missingPerson
            ? e.missingPerson.caseId
            : "N/A",
          file: {
            url: e.fileUrl,
            type: e.fileType,
          },
          date: new Date(e.uploadedAt).toLocaleDateString(),
          //__raw: e,
        }))}
      />
    </div>
  );
};

export default UserDashboard;
