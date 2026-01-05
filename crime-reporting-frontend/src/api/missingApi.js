import api from "./axios";

export const uploadMissingPersonImage = (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  return api.post("/api/upload/missing-person", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createMissingPersons = (missingData) => {
  return api.post("/api/missing-persons", missingData);
};

export const getAllMissingPersons = () => {
  return api.get("/api/missing-persons");
};

export const getAllMissingPersonsById = () => {
  return api.get("/api/missing-persons/my");
};
