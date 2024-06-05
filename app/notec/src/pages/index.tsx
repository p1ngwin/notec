import { ReactNode, useState } from 'react';
import { Grid, Divider } from '@mui/material';
import {
  PermIdentity,
  CreditCard,
  TrendingUp,
  People,
} from '@mui/icons-material';
import React, { useEffect } from 'react';
import { PaperCard } from '@/components/PaperCard';
import dayjs from 'dayjs';
import { appointmentsUrl, personsUrl } from '@/utils/api/urls';
import { useRouter } from 'next/router';
import { useFetchStore } from '@/stores/useRequestStore';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IAppointment } from '@/types/Appointment';
import { formatDate, formatTime } from '@/utils/helpers/utils';
import ActionButton from '@/components/ActionButton';
import EventDetails from '@/components/EventDetails';
import { EventCellProps } from '@/types/common';
import Modal from '@/components/Modal';

const HomePage = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<IAppointment[]>();
  const [personCount, setPersonCount] = useState();
  const [expenses, setExpenses] = useState(0);
  const { t } = useTranslation();

  const { fetch } = useFetchStore();

  useEffect(() => {
    (async () => {
      const persons = await fetch(personsUrl());

      const appointments = await fetch(
        appointmentsUrl(
          new URLSearchParams({ dateOnly: dayjs().format('YYYY-MM-DD') }),
        ),
      );
      setAppointments(appointments);

      setPersonCount(persons?.length ?? 0);
      const expenses = await fetch(personsUrl());
      setExpenses(expenses?.length ?? 0);
    })();
  }, [fetch]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>();

  const handleDialogOpen = (content: ReactNode) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEventClick = ({
    id,
    time,
    first_name,
    last_name,
    service,
    date,
  }: EventCellProps) => {
    handleDialogOpen(
      <EventDetails
        id={id}
        time={formatTime(time)}
        date={formatDate(date)}
        first_name={first_name}
        last_name={last_name}
        service={service}
      />,
    );
  };

  return (
    <div className="content">
      <Grid my={3}>
        <span className="HeaderHeading">{t('homepage.dashboard')}</span>
        <br />
        <span className="HeaderDate">{t('homepage.dashboard_subtext')}</span>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={'1rem'}>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <PaperCard
            title={t('homepage.today_appointments')}
            subtitle={t('homepage.view_today_appointments')}
          >
            <div className="AppointmentsOverview">
              {appointments?.length ? (
                appointments?.map(
                  ({
                    first_name,
                    last_name,
                    date,
                    _id,
                    time,
                    service,
                  }: IAppointment) => (
                    <div key={_id} className="AppointmentItem">
                      <div className="AppointmentIcon">
                        <PermIdentity />
                      </div>
                      <div className="AppointmentDetails">
                        <span className="User">
                          {first_name} {last_name}
                        </span>
                        <br />
                        <span className="Date">{formatTime(date)}</span>
                      </div>
                      <div className="AppointmentAction">
                        <ActionButton
                          isSecondary
                          label="View"
                          onClick={() =>
                            handleEventClick({
                              id: _id!,
                              time,
                              date,
                              first_name,
                              last_name,
                              service,
                            })
                          }
                        />
                      </div>
                    </div>
                  ),
                )
              ) : (
                <span>{t('homepage.no_appointments_today')}</span>
              )}
            </div>
          </PaperCard>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <PaperCard
            onClick={() => router.push('/expenses')}
            title={t('homepage.revenue')}
            subtitle={t('homepage.revenue_overview')}
          >
            <div className="RevenueOverview">
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValue">{expenses.toFixed(2)} €</span>
                  <br />
                  <span className="RevenueValueSubtext">
                    {t('homepage.total_monthly_revenue')}
                  </span>
                </div>
                <div className="RevenueIcon">
                  <CreditCard />
                </div>
              </div>
              <div className="RevenueItem">
                <div className="RevenueDetails">
                  <span className="RevenueValue">+20.1%</span>
                  <br />
                  <span className="RevenueValueSubtext">
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
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <PaperCard
            onClick={() => router.push('/persons')}
            title={t('clients')}
            subtitle={t('homepage.track_monthly_clients')}
          >
            <div className="ClientsOverview">
              <div className="ClientsItem">
                <div className="ClientsDetails">
                  <span className="ClientsValue">{personCount}</span>
                  <br />
                  <span className="ClientsValueSubtext">
                    {t('homepage.total_clients')}
                  </span>
                </div>
                <div className="ClientsIcon">
                  <People />
                </div>
              </div>
              <div className="ClientsItem">
                <div className="ClientsDetails">
                  <span className="ClientsValue">+43.20%</span>
                  <br />
                  <span className="ClientsValueSubtext">
                    {t('homepage.new_monthly_clients')}
                  </span>
                </div>

                <div className="ClientsIcon">
                  <TrendingUp />
                </div>
              </div>
            </div>
          </PaperCard>
        </Grid>
        <Modal open={dialogOpen} onClose={handleDialogClose}>
          {dialogContent}
        </Modal>
      </Grid>
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
