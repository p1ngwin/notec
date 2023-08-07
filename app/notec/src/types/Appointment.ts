export type IAppointment = {
  _id?: string;
  id?: string;
  date: string;
  time: string;
  service_id: string[];
  person_id: string;
  first_name: string;
  last_name: string;
  service: string;
};
