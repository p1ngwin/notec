export interface IService {
  id?: string;
  service: string;
  price?: number;
  uuid: string;
}

export enum HAIR_TYPE {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}
