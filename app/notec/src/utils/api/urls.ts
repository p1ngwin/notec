const ROOT = "http://localhost:8000";

export const personsUrl = (id?: string) => `${ROOT}/persons/${id ? id : "all"}`;

export const createPersonUrl = () => `${ROOT}/persons/add`;

export const deletePersonUrl = () => `${ROOT}/persons/delete`;

export const appointmentsUrl = (query?: URLSearchParams) =>
  `${ROOT}/appointments/all/?${query ? query : ""}`;

export const createAppointmentUrl = () => `${ROOT}/appointments/create`;

export const servicesUrl = (id?: string) =>
  `${ROOT}/services/${id ? id : "all"}`;

export const servicesCreateUrl = () => `${ROOT}/services/create`;

export const servicesDeleteUrl = (id: string) =>
  `${ROOT}/services/create/${id}`;
