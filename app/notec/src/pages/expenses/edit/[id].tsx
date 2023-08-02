import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { expensesGetUrl } from "@/utils/api/urls";
import { IExpenses } from "@/types/Expenses";
import { useFetchStore } from "@/stores/useFetchStore";

const ServicesEdit = () => {
  const { query } = useRouter();

  const [expenses, setExpenses] = useState<IExpenses>();

  const actions = useFetchStore();

  useEffect(() => {
    (async () => {
      const expenses = await actions.fetch(
        expensesGetUrl(new URLSearchParams({ id: query.id as string }))
      );
      expenses && setExpenses(expenses);
    })();
  }, []);

  const { name, cost } = expenses ?? {};

  return (
    <View>
      <div>
        {name}
        <br />
        {cost} €
      </div>
    </View>
  );
};

export default ServicesEdit;
