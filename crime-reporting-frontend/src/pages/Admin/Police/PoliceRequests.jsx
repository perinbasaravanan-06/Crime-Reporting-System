import React from "react";
import "./PoliceRequests.css";
import { useAdmin } from "../../../Context/AdminContext.jsx";

const PoliceRequests = () => {
  const {
    pendingPoliceList,
    pendingPoliceLoading,
    approvePoliceHandler,
    rejectPoliceHandler,
  } = useAdmin();
  console.log(pendingPoliceList);
  if (pendingPoliceLoading) return <p>Loading...</p>;

  return (
    <div className="police-requests">
      <h2>Police Approval Requests</h2>

      {pendingPoliceList.length === 0 ? (
        <div className="empty">No pending requests</div>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Rank</th>
              <th>Badge</th>
              <th>Station</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingPoliceList.map((p,index) => (
              <tr key={p.userId}>
                <td>{index+1}</td>
                <td>{p.name}</td>
                <td>{p.rank}</td>
                <td>{p.badgeNumber}</td>
                <td>{p.stationName}</td>
                <td className="actions">
                  <button
                    className="approve"
                    onClick={() => approvePoliceHandler(p.userId)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => rejectPoliceHandler(p.userId)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PoliceRequests;
