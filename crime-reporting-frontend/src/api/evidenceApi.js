import api from "./axios";

export const uploadEvidenceFile = async (file) => {
  const data = new FormData();
  data.append("file", file);

  const res = await api.post(
    "/api/upload/evidence",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const submitCrimeEvidence = (crimeId, payload) => {
  return api.post(`/api/evidences/crime/${crimeId}/user`, payload);
};

export const submitMissingEvidence = (missingId, payload) => {
  return api.post(`/api/evidences/missing/${missingId}/user`, payload);
};

export const getMyEvidence = () => {
  return api.get(`/api/evidences/user`);
};

export const getAllEvidence = () => {
  return api.get("/api/evidences");
};
