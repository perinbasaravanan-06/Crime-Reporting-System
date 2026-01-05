import React, { useState } from "react";
import { useAdmin } from "../../../Context/AdminContext";


const MissingTable = () => {
  const { missingList } = useAdmin(); 
  const [search, setSearch] = useState("");


  const filteredCases = missingList.filter((m) =>
    `${m.caseId} ${m.name} ${m.city} ${m.reportedBy?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openFile = (fileUrl) => {
    window.open(`${fileUrl}`, "_blank");
  };

  return (
    <div className="missing-table-card">
      <div className="table-header">
        <h3>Reported Missing Persons</h3>

        <input
          type="text"
          placeholder="Search by ID, name, city, reporter"
          className="table-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Reported By</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredCases.length > 0 ? (
              filteredCases.map((m) => (
                <tr key={m.missingId}>
                  <td>{m.caseId}</td>

                  {/* ✅ FIX: use m.photoUrl directly */}
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
                        onClick={() => openFile(m.photoUrl)}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>{m.name}</td>
                  <td>{m.age}</td>
                  <td>{m.city}</td>
                  <td>{m.reportedBy?.name}</td>

                  <td>
                    <span
                      className={`status-badge ${m.status.toLowerCase()}`}
                    >
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No missing cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissingTable;
