import Table, { Action, Column } from '@/components/DataTable';
import View from '@/components/View';
import { revenueUrl } from '@/utils/api/urls';
import { Grid, List, ListItem } from '@mui/material';
import {
  Check,
  Close,
  CreditCard,
  Euro,
  TrendingUp,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFetchStore } from '@/stores/useRequestStore';
import { IRevenue } from '@/types/Revenue';
import dayjs from 'dayjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PaperCard } from '@/components/PaperCard';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'rgb(255, 99, 132)',
        align: 'start',
        position: 'right',
        fullSize: true,
      },
    },
  },
};

const Services = () => {
  const router = useRouter();

  const [revenue, setRevenue] = useState<IRevenue[]>([]);

  const { fetch } = useFetchStore();

  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const revenue = await fetch(revenueUrl());
      revenue && setRevenue(revenue);
    })();
  }, [fetch]);

  const tableColumns: Column<IRevenue>[] = [
    {
      label: t('service_name'),
      field: 'name',
      renderCell: (i) => i.name ?? '',
    },
    {
      label: t('profit'),
      field: 'net_profit',
      renderCell: (i) => <span>{i.net_profit.toFixed(2)} €</span>,
    },
    /*{
      label: 'Realen zaslužek',
      field: 'real_profit',
      renderCell: (i) => (
        <span>{i.real_profit ? `${i.real_profit} €` : 'Ni plačano'}</span>
      ),
    },*/
    {
      label: t('date'),
      field: 'date',
      renderCell: (i) => (
        <span>{i?.date ? dayjs(i.date).format('DD. MM. YYYY') : '/'}</span>
      ),
    },
    {
      label: t('is_paid'),
      field: 'is_paid',
      renderCell: (i) => <span>{i.is_paid ? <Check /> : <Close />}</span>,
    },
    /*{
      label: 'Tip plačila',
      field: 'payment_type',
      renderCell: (i) => (
        <span>{i.payment_type ? i.payment_type : <span>Ni plačano</span>}</span>
      ),
    },*/
  ];

  const rowActions = useMemo<Action<IRevenue>[]>(() => {
    return [
      {
        label: t('actions.edit'),
        onClick: ({ id }) => router.push(`revenue/edit/${id}`),
      },
    ];
  }, [router, t]);

  //TODO: filter low values in order not to bloat the graph .filter(serviceRevenue => serviceRevenue.net_profit >= 20)

  const sum = Object.values(
    revenue?.reduce((acc: any, item: any) => {
      acc[item.name] = acc[item.name] || { ...item, net_profit: 0 };
      acc[item.name].net_profit += item.net_profit;
      return acc;
    }, {}),
  )
    ?.map((sum: any) => sum.net_profit)
    .sort((prevItem, nextItem) => nextItem.value - prevItem.value) //TODO uncomment for displaying all data instead of top 10
    .slice(0, 10); // TODO uncomment for displaying all data instead of top 10

  const top10Income = Object.values(
    revenue
      ?.filter((serviceRevenue) => serviceRevenue.net_profit >= 20)
      .reduce((acc: any, item: any) => {
        acc[item.name] = acc[item.name] || { ...item, net_profit: 0 };
        acc[item.name].net_profit += item.net_profit;
        return acc;
      }, {}),
  )
    ?.map((sum: any) => {
      return { name: sum.name, value: sum.net_profit };
    })
    .sort((prevItem, nextItem) => nextItem.value - prevItem.value)
    .slice(0, 10);

  const data = {
    labels: [...new Set(revenue?.map((rev) => rev.name))],
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    datasets: [
      {
        label: t('total_profit'),
        data: sum,
        backgroundColor: [
          'rgb(230, 25, 75)', // Reddish
          'rgb(60, 180, 75)', // Greenish
          'rgb(100, 140, 230)', // Blueish
          'rgb(255, 205, 86)', // Yellowish
          'rgb(255, 99, 132)', // Pinkish
        ],
      },
    ],
  };

  return (
    <View fullWidth>
      <Grid container sx={{ justifyContent: 'center' }} alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="start"
          alignItems="center"
          mb={4}
        >
          <Grid item xs={8} my={3}>
            <span className="HeaderHeading">
              {t('revenuepage.revenue_overview')}
            </span>
            <br />
            <span className="HeaderDate">
              {t('revenuepage.view_manage_revenue')}
            </span>
          </Grid>
          {/* <Grid
            item
            xs={3}
            justifyContent="start"
            display="flex"
            alignItems="center"
          >
            TODO: Do we need this? <DateNav /> 
          </Grid> */}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4} sx={{ display: 'flex' }}>
          <PaperCard title="Total Revenue" icon={<Euro />}>
            <div className="RevenueOverview">
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValue">{4513.15} €</span>
                </div>
              </div>
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValueSubtext">
                    <span>+20.1%</span>
                    {t('homepage.growth_last_month')}
                  </span>
                </div>

                <div className="RevenueIcon">
                  <TrendingUp />
                </div>
              </div>
            </div>
          </PaperCard>
        </Grid>
        <Grid item xs={4} display="flex">
          <PaperCard
            title={t('revenuepage.average_order_value')}
            icon={<CreditCard />}
          >
            <div className="RevenueOverview">
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValue">{16.39} €</span>
                </div>
              </div>
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValueSubtext">
                    <span>+20.1%</span> {t('homepage.from_last_month')}
                  </span>
                </div>
              </div>
            </div>
          </PaperCard>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex' }} flexGrow={1}>
          <PaperCard
            title={t('revenuepage.conversion_rate')}
            icon={<TrendingUp />}
          >
            <div className="RevenueOverview">
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValue">3.7%</span>
                </div>
              </div>
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValueSubtext">
                    <span>+0.2% </span>
                    {t('homepage.from_last_month')}
                  </span>
                </div>
              </div>
            </div>
          </PaperCard>
        </Grid>
      </Grid>
      <Grid container mt={5} spacing={4} justifyContent="space-around">
        <Grid item xs={6} display="flex" flexGrow={1}>
          <PaperCard
            title={t('revenuepage.revenue_details')}
            subtitle={t('revenuepage.revenue_details_detailed')}
          >
            <Table
              rows={revenue}
              columns={tableColumns}
              rowActions={rowActions}
              rowCount={5}
              searchFieldPlaceholder={t('revenuepage.search_for_revenue')}
            />
          </PaperCard>
        </Grid>
        <Grid item xs={6} display="flex" flexGrow={1}>
          <PaperCard
            title={t('revenuepage.revenue_details')}
            subtitle={t('revenuepage.revnue_top_10_view')}
          >
            <Grid container>
              <Grid item xs={6} display="flex" alignItems="center">
                <List>
                  {top10Income.map((item) => (
                    <ListItem key={item.name}>
                      {item.name} ({item.value.toFixed(2)}€)
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={4} display="flex" alignItems="center">
                <Doughnut data={data} options={chartOptions} />
              </Grid>
            </Grid>
          </PaperCard>
        </Grid>
      </Grid>
    </View>
  );
};

export default Services;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
