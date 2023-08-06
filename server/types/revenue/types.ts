// Odhodki
export type IRevenue = {
  name?: string;
  service_id?: [string];
  person_id?: string;
  payment_type?: PaymentTypeEnum;
  date?: Date;
  is_paid: boolean;
  net_profit?: number; // Prikazan
  real_profit?: number; // Dejanski
  uuid: string; // Firebase user id
};

export enum PaymentTypeEnum {
  CREDIT_CARD = "credit_card",
  CASH = "cash",
}
