import api from "./axios";

//============================ POLICE ============================
                          // total police
export const getAllPolice = () => api.get("/api/admin/police/total");

                          // approve
export const approvePolice = (id) => api.put(`/api/admin/police/approve/${id}`);

                          // reject
export const rejectPolice = (id) => api.put(`/api/admin/police/reject/${id}`);

//============================ USER ============================
export const getAllUsers = () => api.get("/api/admin/users");

//============================ CRIMES ============================
export const getAllCrimes = () => {
  return api.get("/api/crimes");
};
//============================ EVIDENCE ============================
export const getAllEvidence = () => {
  return api.get("/api/evidences");
};
//============================ MISSING ============================
export const getAllMissingPersons = () => {
  return api.get(`/api/missing-persons`);
};
