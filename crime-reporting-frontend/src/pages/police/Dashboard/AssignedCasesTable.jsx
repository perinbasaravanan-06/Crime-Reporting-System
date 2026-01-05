import React from "react";
import "./AssignedCasesTable.css";
import { useRole } from "../../../Context/RoleContext";

const AssignedCasesTable = ({ title, columns, data }) => {

  const isMissingTable = columns.includes("Image");

  return (
    <div className="assigned-table-card">
      <h3>{title}</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id || row.caseId}>
                  {/* CASE ID */}
                  <td>{row.caseId}</td>

                  {/*IMAGE ONLY FOR MISSING CASES */}
                  {isMissingTable && (
                    <td>
                      {row.photoUrl ? (
                        <img
                          src={`${row.photoUrl}`}
                          alt="Missing"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            window.open(
                              `${row.photoUrl}`,
                              "_blank"
                            )
                          }
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                  )}

                  {/* CRIME TYPE OR DESCRIPTION */}
                  <td>{row.crimeType || row.description}</td>

                  {/* STATUS */}
                  <td>{row.status}</td>

                  {/* DATE */}
                  <td>
                    {new Date(row.reportedAt).toLocaleDateString()}
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

export default AssignedCasesTable;
