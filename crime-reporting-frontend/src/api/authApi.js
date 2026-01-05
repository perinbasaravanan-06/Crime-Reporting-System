import api from "./axios";

/* ================= USER / ADMIN LOGIN ================= */
export const normalLoginApi = (email, password) =>
  api.post("/auth/login", null, {
    params: { email, password },
  });

/* ================= POLICE LOGIN ================= */
export const policeLoginApi = (email, password) =>
  api.post("/auth/police/login", null, {
    params: { email, password },
  });

/* ================= USER REGISTRATION ================= */
export const registerUserApi = (data) => api.post("/auth/register/user", data);

/* ================= POLICE REGISTRATION ================= */
export const registerPoliceApi = (data) =>
  api.post("/auth/register/police", data);
