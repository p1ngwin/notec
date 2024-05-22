import Breadcrumbs from '@/components/Breadcrumbs';
import Table, { Action, Column } from '@/components/DataTable';
import HeaderActions from '@/components/HeaderActions';
import View from '@/components/View';
import { revenueUrl } from '@/utils/api/urls';
import { Container, Grid, Stack } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFetchStore } from '@/stores/useRequestStore';
import { IRevenue } from '@/types/Revenue';
import dayjs from 'dayjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PaperCard } from '@/components/PaperCard';
import DateNav from '@/components/DateNav';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

ChartJS.register(ArcElement, Tooltip, Legend);

const Services = () => {
  const router = useRouter();

  const [revenue, setRevenue] = useState<IRevenue[]>([]);

  const { fetch } = useFetchStore();

  useEffect(() => {
    (async () => {
      const revenue = await fetch(revenueUrl());
      revenue && setRevenue(revenue);
    })();
  }, [fetch]);

  const tableColumns: Column<IRevenue>[] = [
    { label: 'Naziv storitve', field: 'name', renderCell: (i) => i.name ?? '' },
    {
      label: 'Prikazan zaslužek',
      field: 'net_profit',
      renderCell: (i) => (
        <span>
          <b>{i.net_profit} €</b>
        </span>
      ),
    },
    {
      label: 'Realen zaslužek',
      field: 'real_profit',
      renderCell: (i) => (
        <span>
          <b>{i.real_profit ? `${i.real_profit} €` : 'Ni plačano'}</b>
        </span>
      ),
    },
    {
      label: 'Datum',
      field: 'date',
      renderCell: (i) => (
        <span>{i?.date ? dayjs(i.date).format('DD. MM. YYYY') : '/'}</span>
      ),
    },
    {
      label: 'Plačano',
      field: 'is_paid',
      renderCell: (i) => <span>{i.is_paid ? <Check /> : <Close />}</span>,
    },
    {
      label: 'Tip plačila',
      field: 'payment_type',
      renderCell: (i) => (
        <span>{i.payment_type ? i.payment_type : <span>Ni plačano</span>}</span>
      ),
    },
  ];

  const rowActions = useMemo<Action<IRevenue>[]>(() => {
    return [
      {
        label: 'Edit',
        onClick: ({ id }) => router.push(`revenue/edit/${id}`),
      },
    ];
  }, [router]);

  // const sum = Object.values(
  //   revenue?.reduce((acc: any, item: any) => {
  //     acc[item.name] = acc[item.name] || { ...item, net_profit: 0 };
  //     acc[item.name].net_profit += item.net_profit;
  //     return acc;
  //   }, {})
  // )?.map((sum: any) => sum.net_profit);

  // const data = {
  //   labels: [...new Set(revenue?.map((rev) => rev.name))],
  //   datasets: [
  //     {
  //       label: "Zaslužek v €",
  //       data: sum,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  return (
    <View fullWidth>
      <Container maxWidth="lg">
        <HeaderActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Breadcrumbs depth={1} values={['Prihodki']} />
          </Stack>
          <DateNav />
        </HeaderActions>
        <Table rows={revenue} columns={tableColumns} rowActions={rowActions} />
        {revenue.length && (
          <Grid container sx={{ paddingTop: '2rem' }}>
            <Grid item xs={6} sx={{ display: 'flex' }}>
              <PaperCard title="Promet">
                {/* <Doughnut data={data} />; */}
              </PaperCard>
            </Grid>
          </Grid>
        )}
      </Container>
    </View>
  );
};

export default Services;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
