import React from "react";
import "./PoliceApproved.css";
import { useAdmin } from "../../../Context/AdminContext.jsx";

const PoliceApproved = () => {
  const { approvedPoliceList, approvedPoliceLoading } = useAdmin();

  if (approvedPoliceLoading) return <p>Loading...</p>;

  return (
    <div className="police-approved">
      <h2>Approved Police</h2>

      {approvedPoliceList.length === 0 ? (
        <div className="empty">No Approved Police</div>
      ) : (
        /* ✅ THIS IS THE IMPORTANT FIX */
        <div className="table-wrapper">
          <table className="approved-table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Badge</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
              {approvedPoliceList.map((p, index) => (
                <tr key={p.userId}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.rank}</td>
                  <td>{p.badgeNumber}</td>
                  <td>{p.stationName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PoliceApproved;
