// Odhodki
export type IExpenses = {
  name: string;
  cost: number;
  due_date: Date;
  payment_date?: Date;
  uuid: string; // Firebase user id
};
