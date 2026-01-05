import React, { useState } from "react";
import { useAdmin } from "../../../Context/AdminContext"

const CrimeTable = () => {
  const { crimeList, crimeListLoading } = useAdmin();
  const [search, setSearch] = useState("");

  if (crimeListLoading) return <p>Loading...</p>;

  const filteredCrimes = crimeList.filter((c) =>
    `${c.caseId} ${c.crimeType} ${c.location} ${c.user?.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="crime-table-card">
      <div className="table-header">
        <h3>Reported Crime Cases</h3>

        <input
          type="text"
          placeholder="Search by case id, type, location, user"
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
              <th>Type</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Reported On</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredCrimes.length > 0 ? (
              filteredCrimes.map((c) => (
                <tr key={c.crimeId}>
                  <td>{c.caseId}</td>
                  <td>{c.crimeType}</td>
                  <td>
                    {c.location}
                    {c.city && `, ${c.city}`}
                  </td>
                  <td>{c.reportedBy.name || "Unknown"}</td>
                  <td>{new Date(c.reportedAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status-badge ${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No crime cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrimeTable;
