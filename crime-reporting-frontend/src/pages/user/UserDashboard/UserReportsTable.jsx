import React,{useState} from "react";
import "./UserReportsTable.css";
// import DetailsModal from "../../../components/common/DetailsModal/DetailsModal.jsx";
const UserReportsTable = ({ title, columns, data }) => {
// const [selected, setSelected] = useState(null);
  return (
    <>
    <div className="user-table-card">
      <h3>{title}</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
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
              data.map((row, index) => (
                <tr
                    key={index}
                    // className="clickable-row"
                    // onClick={() => setSelected(row.__raw)} // 👈 important
                  >
                  {Object.entries(row).map(([key, value], i) => (
                    <td key={i}>
                      {/* ✅ FIXED: Missing image is a STRING, not object */}
                      {key === "image" && value ? (
                        <img
                          src={`${value}`}
                          alt="Missing Person"
                          className="table-image"
                        />
                      ) : key === "file" && value ? (
                        value.type === "IMAGE" ? (
                          <img
                            src={`${value.url}`}
                            alt="Evidence"
                            className="table-image"
                          />
                        ) : value.type === "DOCUMENT" ? (
                          <a
                            href={`${value.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdf-link"
                          >
                            📄 View PDF
                          </a>
                        ) : (
                          "Unsupported file"
                        )
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    {/* MODAL
      <DetailsModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={title}
        data={selected}
        type={type}
      /> */}
    </>
    
  );
};

export default UserReportsTable;
