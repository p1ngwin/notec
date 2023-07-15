const ROOT = "http://localhost:8000";

export const personsUrl = (id?: string) => `${ROOT}/persons/${id ? id : "all"}`;

export const createPersonUrl = () => `${ROOT}/persons/add`;

export const deletePersonUrl = () => `${ROOT}/persons/delete`;