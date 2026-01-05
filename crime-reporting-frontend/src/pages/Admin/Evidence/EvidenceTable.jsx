import React, { useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";


const EvidenceTable = () => {
  const { evidenceList } = useAdmin();
  const [search, setSearch] = useState("");


  const filteredEvidence = evidenceList.filter((e) =>
    `${e.evidenceCode} ${e.uploadedBy?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openFile = (fileUrl) => {
    window.open(`${fileUrl}`, "_blank");
  };

  return (
    <div className="evidence-table-card">
      <div className="table-header">
        <h3>Submitted Evidence</h3>

        <input
          type="text"
          className="table-search"
          placeholder="Search by evidence code or user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Evidence Code</th>
              <th>Case</th>
              <th>Preview</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvidence.length > 0 ? (
              filteredEvidence.map((e) => (
                <tr key={e.evidenceId}>
                  <td>{e.evidenceCode}</td>

                  <td>
                    {e.crime
                      ? e.crime.caseId
                      : e.missingPerson?.caseId}
                  </td>

                  <td>
                    {e.fileType === "IMAGE" ? (
                      <img
                        src={`${e.fileUrl}`}
                        alt="Evidence"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => openFile(e.fileUrl)}
                      />
                    ) : (
                      <button
                        className="link-btn"
                        onClick={() => openFile(e.fileUrl)}
                      >
                        View Document
                      </button>
                    )}
                  </td>

                  <td>{e.uploadedBy?.name}</td>

                  <td>
                    {new Date(e.uploadedAt).toLocaleDateString()}
                  </td>

                  <td>{e.fileType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No evidence found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvidenceTable;
