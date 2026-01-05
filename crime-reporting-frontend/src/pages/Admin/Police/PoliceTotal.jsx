import React from "react";
import "./PoliceTotal.css";
import { useAdmin } from "../../../Context/AdminContext.jsx";

const PoliceTotal = () => {
  const { policeList, policeLoading } = useAdmin();

  if (policeLoading) return <p>Loading police data...</p>;

  return (
    <div className="police-total">
      <h2>All Registered Police</h2>
      <p className="subtitle">
        Complete list of police officers with approval status
      </p>

      {policeList.length === 0 ? (
        <div className="empty">No police records found</div>
      ) : (
        <div className="table-wrapper">
          <table className="police-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Badge Number</th>
                <th>Station</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {policeList.map((police, index) => (
                <tr key={police.userId}>
                  <td>{index + 1}</td>
                  <td>{police.name}</td>
                  <td>{police.rank}</td>
                  <td>{police.badgeNumber}</td>
                  <td>{police.stationName}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        police.approvalStatus?.toLowerCase()
                      }`}
                    >
                      {police.approvalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PoliceTotal;
