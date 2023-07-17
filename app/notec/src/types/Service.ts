export type IService = {
  _id?: string;
  service: SERVICE_TYPES;
};

export enum SERVICE_TYPES {
  CUT = "CUT",
  COLOR = "COLOR",
  FAN = "FAN",
}
