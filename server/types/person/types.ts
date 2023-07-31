export interface IPerson {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  uuid: string; // Firebase user id
}
