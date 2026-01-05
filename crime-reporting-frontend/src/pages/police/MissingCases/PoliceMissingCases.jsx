import React from "react";
import "./PoliceMissingCases.css";
import { usePolice } from "../../../Context/PoliceContext";
import { updateMissingStatus } from "../../../api/policeApi";
import { toastError, toastSuccess } from "../../../utils/toast";

const PoliceMissingCases = () => {
  const { missingCases, loading, fetchPoliceData } = usePolice();

  const handleStatusChange = async (missingId, newStatus) => {
    try {
      await updateMissingStatus(missingId, newStatus);
      toastSuccess("Status updated successfully");
      fetchPoliceData(); // refresh from backend
    } catch (error) {
      console.error("Failed to update missing person status", error);
      toastError("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="police-missing-page">
      <div className="page-header">
        <h2>Missing Person Cases</h2>
        <p>View and manage assigned missing person cases</p>
      </div>

      <div className="missing-table-wrapper">
        <table className="missing-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Photo</th> {/* ✅ ADDED */}
              <th>Name</th>
              <th>Age</th>
              <th>Last Seen</th>
              <th>Reported On</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {missingCases.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty">
                  No assigned missing cases
                </td>
              </tr>
            ) : (
              missingCases.map((m) => (
                <tr key={m.missingId}>
                  <td>{m.caseId}</td>

                  {/* ✅ PHOTO COLUMN */}
                  <td>
                    {m.photoUrl ? (
                      <img
                        src={`${m.photoUrl}`}
                        alt="Missing"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(`${m.photoUrl}`, "_blank")}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>{m.name}</td>
                  <td>{m.age}</td>
                  <td>{m.lastSeenLocation}</td>
                  <td>{new Date(m.reportedAt).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`status ${m.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {m.status.replace("_", " ")}
                    </span>
                  </td>

                  <td>
                    {m.status !== "FOUND" ? (
                      <select
                        className="status-select"
                        value={m.status}
                        onChange={(e) =>
                          handleStatusChange(m.missingId, e.target.value)
                        }
                      >
                        <option value="SUBMITTED">Submitted</option>
                        <option value="UNDER INVESTIGATION">
                          Under Investigation
                        </option>
                        <option value="FOUND">Found</option>
                      </select>
                    ) : (
                      <span className="done-text">✔ Closed</span>
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

export default PoliceMissingCases;
