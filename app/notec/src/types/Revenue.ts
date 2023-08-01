// Odhodki
export type IRevenue = {
  id: string;
  name?: string;
  payment_type: PaymentTypeEnum;
  date: Date;
  is_paid: boolean;
  net_profit: number; // Prikazan
  real_profit: number; // Dejanski
};

export enum PaymentTypeEnum {
  CREDIT_CARD = "credit_card",
  CASH = "cash",
}
