import React from "react";
import "./PoliceCrimeCases.css";
import { usePolice } from "../../../Context/PoliceContext";
import { updateCrimeStatus } from "../../../api/policeApi";
import { toastError, toastSuccess } from "../../../utils/toast";

const PoliceCrimeCases = () => {
  const { crimeCases, loading, fetchPoliceData } = usePolice();

  const handleStatusChange = async (crimeId, newStatus) => {
    try {
      await updateCrimeStatus(crimeId, newStatus);
      toastSuccess("Status updated successfully");
      fetchPoliceData(); // refresh data
    } catch (error) {
      console.error("Failed to update crime status", error);
      toastError("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="police-crime-page">
      <div className="page-header">
        <h2>Crime Cases</h2>
        <p>View and manage assigned crime cases</p>
      </div>

      <div className="crime-table-wrapper">
        <table className="crime-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Crime Type</th>
              <th>Location</th>
              <th>Reported On</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {crimeCases.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No assigned crime cases
                </td>
              </tr>
            ) : (
              crimeCases.map((crime) => (
                <tr key={crime.crimeId}>
                  <td>{crime.caseId}</td>
                  <td>{crime.crimeType}</td>
                  <td>{crime.location}</td>
                  <td>{new Date(crime.reportedAt).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`status ${crime.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {crime.status.replace("_", " ")}
                    </span>
                  </td>

                  <td>
                    {crime.status !== "SOLVED" ? (
                      <select
                        className="status-select"
                        value={crime.status}
                        onChange={(e) =>
                          handleStatusChange(crime.crimeId, e.target.value)
                        }
                      >
                        <option value="PENDING">Pending</option>
                        <option value="UNDER INVESTIGATION">
                          Under Investigation
                        </option>
                        <option value="SOLVED">Solved</option>
                      </select>
                    ) : (
                      <span className="done-text">✔ Completed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoliceCrimeCases;
