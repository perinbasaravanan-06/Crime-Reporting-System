import api from "./axios";

export const createCrime = (crimeData) => {
  return api.post(`/api/crimes`, crimeData);
};

export const getMyCrimes = () => {
  return api.get(`/api/crimes/my`);
};

export const getAllCrimes = () => {
  return api.get("/api/crimes");
};
