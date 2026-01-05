import React from "react";
import { useNavigate } from "react-router-dom";
import "./PoliceOverview.css";
import { useAdmin } from "../../../Context/AdminContext.jsx";
import PoliceTotal from "./PoliceTotal.jsx";

const PoliceOverview = () => {
  const navigate = useNavigate();
  const {
    policeList,
    approvedPoliceList,
    rejectedPoliceList,
    pendingPoliceList
  } = useAdmin();
  return (
    <>
      <div className="police-overview">
        <h2>Police Management</h2>
        <p className="subtitle">
          Manage police registrations and monitor approval status
        </p>

        <div className="police-stats">
          <div className="stat-card">
            <h3>Total Police</h3>
            <span>{policeList.length}</span>
          </div>

          <div className="stat-card pending">
            <h3>Pending</h3>
            <span>{pendingPoliceList.length}</span>
          </div>

          <div className="stat-card approved">
            <h3>Approved</h3>
            <span>{approvedPoliceList.length}</span>
          </div>

          <div className="stat-card rejected">
            <h3>Rejected</h3>
            <span>{rejectedPoliceList.length}</span>
          </div>
        </div>

        <div className="police-action">
          <button onClick={() => navigate("/admin/police/requests")}>
            View Requests
          </button>
          <button onClick={() => navigate("/admin/police/approved")}>
            Approved
          </button>
          <button onClick={() => navigate("/admin/police/rejected")}>
            Rejected
          </button>
        </div>
      </div>

      <PoliceTotal />
    </>
  );
};

export default PoliceOverview;
