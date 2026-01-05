import React from "react";
import "./MyReports.css";
import "../UserDashboard/UserReportsTable.css"; // 👈 reuse dashboard table styles
import { useCrime } from "../../../Context/CrimeContext";
import { useMissing } from "../../../Context/MissingContext";
import { useEvidence } from "../../../Context/EvidenceContext";
import jsPDF from "jspdf";

/* ================= IMAGE → BASE64 HELPER ================= */
const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = reject;
  });
};

const MyReports = () => {
  const { crimesListById } = useCrime();
  const { missingPersonsListById } = useMissing();
  const { evidenceListByUser } = useEvidence();

  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = async () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("My Reports", 14, y);
    y += 10;

    crimesListById.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.caseId} | ${c.crimeType} | ${c.status}`, 14, y);
      y += 6;
    });

    for (const m of missingPersonsListById) {
      if (m.photoUrl) {
        const img = await loadImageAsBase64(`${m.photoUrl}`);
        doc.addImage(img, "JPEG", 14, y, 40, 40);
        y += 45;
      }
    }

    doc.save("My_Reports.pdf");
  };

  return (
    <div className="my-reports">
      <div className="header-row">
        <div>
          <h2>My Reports</h2>
          <p className="subtitle">
            View all your submitted crime reports, missing person cases, and evidence
          </p>
        </div>

        <button className="download-btn" onClick={downloadPDF}>
          ⬇ Download PDF
        </button>
      </div>

      {/* ================= CRIME REPORTS ================= */}
      <div className="user-table-card">
        <h3>Crime Reports</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Case ID</th>
                <th>Crime Type</th>
                <th>Status</th>
                <th>Reported On</th>
              </tr>
            </thead>
            <tbody>
              {crimesListById.map((c, i) => (
                <tr key={c.caseId}>
                  <td>{i + 1}</td>
                  <td>{c.caseId}</td>
                  <td>{c.crimeType}</td>
                  <td>{c.status}</td>
                  <td>{new Date(c.reportedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MISSING REPORTS ================= */}
      <div className="user-table-card">
        <h3>Missing Person Reports</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Case ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Status</th>
                <th>Reported On</th>
              </tr>
            </thead>
            <tbody>
              {missingPersonsListById.map((m, i) => (
                <tr key={m.caseId}>
                  <td>{i + 1}</td>
                  <td>{m.caseId}</td>
                  <td>{m.name}</td>
                  <td>
                    <img
                      src={`${m.photoUrl}`}
                      alt="Missing"
                      className="table-image"
                    />
                  </td>
                  <td>{m.status}</td>
                  <td>{new Date(m.reportedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EVIDENCE ================= */}
      <div className="user-table-card">
        <h3>Evidence Submitted</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Evidence ID</th>
                <th>Case ID</th>
                <th>Preview</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {evidenceListByUser.map((e, i) => (
                <tr key={e.evidenceId}>
                  <td>{i + 1}</td>
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
                        className="table-image"
                      />
                    ) : (
                      <a
                        href={`${e.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="pdf-link"
                      >
                        📄 View
                      </a>
                    )}
                  </td>
                  <td>{new Date(e.uploadedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
