import { updateEvidenceStatus } from "../../../api/policeApi";
import { usePolice } from "../../../Context/PoliceContext";
import React from "react";
import "./PoliceEvidence.css";

import { toastError, toastSuccess } from "../../../utils/toast";

const PoliceEvidence = () => {
  const { evidenceList, fetchPoliceData } = usePolice();
  const updateStatus = async (id, status) => {
    try{
      await updateEvidenceStatus(id, status);
      toastSuccess("Status updated successfully")
    fetchPoliceData();
    }catch(error){
      toastError("Failed to update Evidence status");
    }
    
  };

  return (
    <div className="police-evidence-page">
      <div className="page-header">
        <h2>Evidences</h2>
        <p>View and manage Evidences</p>
      </div>

      <div className="evidence-table-wrapper">
        <table className="evidence-table">
          <thead>
            <tr>
              <th>EVIDENCE ID</th>
              <th>CASE ID</th>
              <th>PROOF</th>
              <th>Reported On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {evidenceList.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">
                  No evidences found
                </td>
              </tr>
            ) : (
              evidenceList.map((e) => (
                <tr key={e.evidenceId}>
                  <td>{e.evidenceCode}</td>

                  <td>
                    {e.crime ? e.crime.caseId : e.missingPerson?.caseId}
                  </td>

                  <td>
                    <a
                      href={`${e.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>

                  <td>{new Date(e.uploadedAt).toLocaleDateString()}</td>

                  <td>
                    <span className={`status ${e.status.toLowerCase()}`}>
                      {e.status}
                    </span>
                  </td>

                  <td className="actions">
                    {e.status === "PENDING" ? (
                      <>
                        <button
                          className="approve"
                          onClick={() =>
                            updateStatus(e.evidenceId, "APPROVED")
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="reject"
                          onClick={() =>
                            updateStatus(e.evidenceId, "REJECTED")
                          }
                        >
                          Reject
                        </button>
                      </>
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

export default PoliceEvidence;
