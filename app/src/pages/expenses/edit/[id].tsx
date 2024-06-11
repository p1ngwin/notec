import View from "@/components/View";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { expensesGetUrl } from "@/utils/api/urls";
import { IExpenses } from "@/types/Expenses";
import { useFetchStore } from "@/stores/useRequestStore";

const ServicesEdit = () => {
  const { query } = useRouter();

  const [expenses, setExpenses] = useState<IExpenses>();

  const { fetch } = useFetchStore();

  useEffect(() => {
    (async () => {
      const expenses = await fetch(
        expensesGetUrl(new URLSearchParams({ id: query.id as string }))
      );
      expenses && setExpenses(expenses);
    })();
  }, [fetch, query.id]);

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
