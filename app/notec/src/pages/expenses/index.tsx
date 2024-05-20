import Breadcrumbs from '@/components/Breadcrumbs';
import Table, { Action, Column } from '@/components/DataTable';
import HeaderActions from '@/components/HeaderActions';
import View from '@/components/View';
import { expensesGetUrl } from '@/utils/api/urls';
import { Container, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFetchStore } from '@/stores/useRequestStore';
import dayjs from 'dayjs';
import { IExpenses } from '@/types/Expenses';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Expenses = () => {
  const router = useRouter();

  const { t } = useTranslation(['expenses', 'common']);

  const [expenses, setExpenses] = useState<IExpenses[]>([]);

  const { fetch } = useFetchStore();

  useEffect(() => {
    (async () => {
      const expenses = await fetch(expensesGetUrl());
      expenses && setExpenses(expenses);
    })();
  }, [fetch]);

  const tableColumns: Column<IExpenses>[] = [
    {
      label: t('expense.title'),
      field: 'name',
      renderCell: (i) => i.name ?? '',
    },
    {
      label: t('expense.price'),
      field: 'cost',
      renderCell: (i) => (
        <span>
          <b>{i.cost} €</b>
        </span>
      ),
    },
    {
      label: t('expense.due_date'),
      field: 'due_date',
      renderCell: (i) => (
        <span>{dayjs(i.due_date).format('DD. MM. YYYY')}</span>
      ),
    },
    {
      label: t('expense.payment_date'),
      field: 'payment_date',
      renderCell: (i) => (
        <span>
          {i?.payment_date ? dayjs(i.payment_date).format('DD. MM. YYYY') : '/'}
        </span>
      ),
    },
  ];

  const rowActions = useMemo<Action<IExpenses>[]>(() => {
    return [
      {
        label: t('actions.edit'),
        onClick: ({ id }) => router.push(`revenue/edit/${id}`),
      },
    ];
  }, [router, t]);

  return (
    <View fullWidth>
      <Container maxWidth="lg">
        <HeaderActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumbs depth={1} values={['Odhodki']} />
          </Stack>
        </HeaderActions>
        <Table rows={expenses} columns={tableColumns} rowActions={rowActions} />
        <Grid container sx={{ paddingTop: '2rem' }}>
          <Grid item xs={6} sx={{ display: 'flex' }}></Grid>
        </Grid>
      </Container>
    </View>
  );
};

export default Expenses;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
