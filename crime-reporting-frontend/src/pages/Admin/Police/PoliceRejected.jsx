import React from "react";
import "./PoliceRejected.css";
import { useAdmin } from "../../../Context/AdminContext.jsx";

const PoliceRejected = () => {
  const { rejectedPoliceList, rejectedPoliceLoading } = useAdmin();

  if (rejectedPoliceLoading) return <p>Loading...</p>;

  return (
    <div className="police-rejected">
      <h2>Rejected Police</h2>

      {rejectedPoliceList.length === 0 ? (
        <div className="empty">No Rejected Police</div>
      ) : (
        <table className="rejected-table">
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
            {rejectedPoliceList.map((p,index) => (
              <tr key={p.userId}>
                <td>{index+1}</td>
                <td>{p.name}</td>
                <td>{p.rank}</td>
                <td>{p.badgeNumber}</td>
                <td>{p.stationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PoliceRejected;
