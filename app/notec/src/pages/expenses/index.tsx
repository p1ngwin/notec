import Breadcrumbs from "@/components/Breadcrumbs";
import Table, { Action, Column } from "@/components/DataTable";
import HeaderActions from "@/components/HeaderActions";
import View from "@/components/View";
import { expensesGetUrl } from "@/utils/api/urls";
import { Container, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useFetchStore } from "@/stores/useFetchStore";
import dayjs from "dayjs";
import { IExpenses } from "@/types/Expenses";

const Expenses = () => {
  const router = useRouter();

  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  const actions = useFetchStore();

  useEffect(() => {
    (async () => {
      const expenses = await actions.fetch(expensesGetUrl());
      expenses && setExpenses(expenses);
    })();
  }, []);

  const tableColumns: Column<IExpenses>[] = [
    { label: "Naziv stroška", field: "name", renderCell: (i) => i.name ?? "" },
    {
      label: "Naziv stroška",
      field: "cost",
      renderCell: (i) => (
        <span>
          <b>{i.cost} €</b>
        </span>
      ),
    },
    {
      label: "Rok plačila",
      field: "due_date",
      renderCell: (i) => (
        <span>{dayjs(i.due_date).format("DD. MM. YYYY")}</span>
      ),
    },
    {
      label: "Datum plačila",
      field: "payment_date",
      renderCell: (i) => (
        <span>
          {i?.payment_date ? dayjs(i.payment_date).format("DD. MM. YYYY") : "/"}
        </span>
      ),
    },
  ];

  const rowActions = useMemo<Action<IExpenses>[]>(() => {
    return [
      {
        label: "Edit",
        onClick: ({ id }) => router.push(`revenue/edit/${id}`),
      },
    ];
  }, [router]);

  return (
    <View fullWidth>
      <Container maxWidth="lg">
        <HeaderActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumbs
              depth={1}
              values={["Odhodki"]}
            />
          </Stack>
        </HeaderActions>
        <Table
          rows={expenses}
          columns={tableColumns}
          rowActions={rowActions}
        />
        <Grid
          container
          sx={{ paddingTop: "2rem" }}
        >
          <Grid
            item
            xs={6}
            sx={{ display: "flex" }}
          ></Grid>
        </Grid>
      </Container>
    </View>
  );
};

export default Expenses;
