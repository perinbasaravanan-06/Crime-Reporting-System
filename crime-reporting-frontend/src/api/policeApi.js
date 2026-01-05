import api from "./axios";

export const getPoliceCrimes = () =>
  api.get(`/api/crimes/police`);

export const getPoliceMissing = () =>
  api.get(`/api/missing-persons/police`);

export const getPoliceEvidence = () =>
  api.get(`/api/evidences/police`);

export const updateCrimeStatus = (crimeId, status) =>
  api.put(`/api/crimes/${crimeId}/status`, null, {
    params: { status },
  });

export const updateMissingStatus = (missingId, status) =>
  api.put(`/api/missing-persons/${missingId}/status`, null, {
    params: { status },
  });

export const updateEvidenceStatus = (evidenceId, status) =>
  api.put(`/api/evidences/${evidenceId}/status`, null, {
    params: { status },
  });
