import React from "react";
import "./PoliceMyReports.css";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { usePolice } from "../../../Context/PoliceContext.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

const PoliceMyReports = () => {
  const { user } = useAuth();
  const { crimeCases, missingCases, evidenceList } = usePolice();

  const officerName = user?.name;
  const officerRank = user?.rank;

  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = async () => {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(16);
    doc.text("Police My Reports", 14, y);
    y += 10;

    /* ================= CASE SUMMARY TABLE ================= */
    autoTable(doc, {
      startY: y,
      head: [["Type", "Case ID", "Status", "Date"]],
      body: [
        ...crimeCases.map((c) => [
          "Crime",
          c.caseId,
          c.status,
          new Date(c.reportedAt).toLocaleDateString(),
        ]),
        ...missingCases.map((m) => [
          "Missing",
          m.caseId,
          m.status,
          new Date(m.reportedAt).toLocaleDateString(),
        ]),
      ],
    });

    y = doc.lastAutoTable.finalY + 10;

    /* ================= MISSING PERSON IMAGES ================= */
    if (missingCases.length > 0) {
      doc.setFontSize(14);
      doc.text("Missing Person Photos", 14, y);
      y += 8;

      for (const m of missingCases) {
        if (!m.photoUrl) continue;

        const img = await loadImageAsBase64(`${m.photoUrl}`);

        doc.setFontSize(10);
        doc.text(`Case ID: ${m.caseId} | Name: ${m.name}`, 14, y);
        y += 4;

        doc.addImage(img, "JPEG", 14, y, 40, 40);
        y += 45;

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    }

    /* ================= EVIDENCE IMAGES ================= */
    const imageEvidence = evidenceList.filter(
      (e) => e.fileType === "IMAGE"
    );

    if (imageEvidence.length > 0) {
      doc.addPage();
      y = 20;

      doc.setFontSize(14);
      doc.text("Evidence Images", 14, y);
      y += 8;

      for (const e of imageEvidence) {
        const img = await loadImageAsBase64(`${e.fileUrl}`);

        doc.setFontSize(10);
        doc.text(
          `Evidence: ${e.evidenceCode} | Case: ${
            e.crime?.caseId || e.missingPerson?.caseId
          }`,
          14,
          y
        );
        y += 4;

        doc.addImage(img, "JPEG", 14, y, 40, 40);
        y += 45;

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    }

    doc.save("police-my-reports.pdf");
  };

  return (
    <div className="police-myreports">
      <div className="page-header">
        <div>
          <h2>My Reports</h2>
          <p>
            Cases and evidence handled by {officerRank} {officerName}
          </p>
        </div>

        <button className="download-btn" onClick={downloadPDF}>
          ⬇ Download Report (PDF)
        </button>
      </div>

      {/* ================= CRIME CASES ================= */}
      <div className="table-card">
        <h3>Assigned Crime Cases</h3>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Crime Type</th>
              <th>Status</th>
              <th>Reported On</th>
            </tr>
          </thead>
          <tbody>
            {crimeCases.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No assigned crime cases
                </td>
              </tr>
            ) : (
              crimeCases.map((c) => (
                <tr key={c.crimeId}>
                  <td>{c.caseId}</td>
                  <td>{c.crimeType}</td>
                  <td>
                    <span className={`status ${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{new Date(c.reportedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MISSING CASES ================= */}
      <div className="table-card">
        <h3>Assigned Missing Cases</h3>
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Status</th>
              <th>Reported On</th>
            </tr>
          </thead>
          <tbody>
            {missingCases.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No assigned missing cases
                </td>
              </tr>
            ) : (
              missingCases.map((m) => (
                <tr key={m.missingId}>
                  <td>{m.caseId}</td>
                  <td>
                    {m.photoUrl ? (
                      <img
                        src={`${m.photoUrl}`}
                        alt="Missing"
                        className="table-image"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{m.name}</td>
                  <td>
                    <span className={`status ${m.status.toLowerCase()}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{new Date(m.reportedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EVIDENCE ================= */}
      <div className="table-card">
        <h3>Evidence Reviewed</h3>
        <table>
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Case ID</th>
              <th>File</th>
              <th>Status</th>
              <th>Uploaded On</th>
            </tr>
          </thead>
          <tbody>
            {evidenceList.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No evidence reviewed
                </td>
              </tr>
            ) : (
              evidenceList.map((e) => (
                <tr key={e.evidenceId}>
                  <td>{e.evidenceCode}</td>
                  <td>
                    {e.crime
                      ? e.crime.caseId
                      : e.missingPerson
                      ? e.missingPerson.caseId
                      : "N/A"}
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
                        className="file-link"
                      >
                        📄 View File
                      </a>
                    )}
                  </td>
                  <td>
                    <span className={`status ${e.status.toLowerCase()}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>{new Date(e.uploadedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoliceMyReports;
