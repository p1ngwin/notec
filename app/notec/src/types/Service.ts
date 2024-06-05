export type IService = {
  _id: string;
  id: string;
  service: SERVICE_TYPES;
  price: number;
  note?: string;
};

export enum SERVICE_TYPES {
  CUT = "CUT",
  COLOR = "COLOR",
  FAN = "FAN",
}
