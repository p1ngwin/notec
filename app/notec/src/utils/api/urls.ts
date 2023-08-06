const ROOT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://notec-server.vercel.app";

//const ROOT = "http://localhost:8000";

export const personsUrl = (id?: string) => `${ROOT}/persons/${id ? id : "all"}`;

export const createPersonUrl = () => `${ROOT}/persons/add`;

export const deletePersonUrl = (id: string) => `${ROOT}/persons/delete/${id}`;

export const updatePersonUrl = (id: string) => `${ROOT}/persons/update/${id}`;

export const appointmentsUrl = (query?: URLSearchParams) =>
  `${ROOT}/appointments/all/?${query ? query : ""}`;

export const createAppointmentUrl = () => `${ROOT}/appointments/create`;

export const servicesUrl = (id?: string) =>
  `${ROOT}/services/${id ? id : "all"}`;

export const servicesCreateUrl = () => `${ROOT}/services/create`;

export const servicesDeleteUrl = (id: string) =>
  `${ROOT}/services/delete/${id}`;

export const servicesUpdateUrl = (id: string) =>
  `${ROOT}/services/update/${id}`;

export const revenueUrl = (query?: URLSearchParams) =>
  `${ROOT}/revenue/all/?${query ? query : ""}`;

export const expensesGetUrl = (query?: URLSearchParams) =>
  `${ROOT}/expenses/all/?${query ? query : ""}`;
