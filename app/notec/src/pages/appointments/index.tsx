import { ReactNode, useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventContentArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import View from '@/components/View';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IAppointment } from '@/types/Appointment';
import { appointmentsUrl, deleteAppointmentUrl } from '@/utils/api/urls';
import styles from './styles.module.sass';
import {
  DATE_FORMAT_WEEK_VIEW,
  DEFAULT_DATE_FORMAT_DAY,
  DEFAULT_DATE_FORMAT_MONTH,
  formatDate,
  formatTime,
  parseDateTime,
} from '@/utils/helpers/utils';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/Breadcrumbs';
import HeaderActions from '@/components/HeaderActions';
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { useDeleteStore, useFetchStore } from '@/stores/useRequestStore';
import Modal from '@/components/Modal';
import {
  ChevronRightOutlined,
  CalendarTodayOutlined,
  TimerOutlined,
  PersonOutline,
  NavigateBefore as PrevMonthIcon,
  NavigateNext as NextMonthIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useDateStore } from '@/stores/useDateStore';
import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

type DateQueryArgs = {
  endStr: string;
  startStr: string;
};

enum CalendarType {
  timeGridDay = 'timeGridDay',
  timeGridWeek = 'timeGridWeek',
  dayGridMonth = 'dayGridMonth',
}

const Appointments = () => {
  const {
    AppointmentsView,
    EventCell,
    SlotLabelDay,
    SlotLabelWeek,
    SlotServiceItem,
    DateNavArrow,
    DateNavCn,
  } = styles;

  const { fetch } = useFetchStore();

  const router = useRouter();

  const { t } = useTranslation('appointments');

  const { getSelectedDate } = useDateStore();

  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarApi = calendarRef.current?.getApi();

  useEffect(() => {
    calendarApi?.gotoDate(dayjs().toISOString());
  }, [calendarApi, getSelectedDate]);

  const [appointments, setAppointments] = useState<IAppointment[]>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const [currentStart, setCurrentStart] = useState('');
  const [currentEnd, setCurrentEnd] = useState('');

  const handleDialogOpen = (content: ReactNode) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDateClick = (arg: DateClickArg) => {
    if (!calendarApi) return;
    router.push(
      `/appointments/add?date=${parseDateTime(
        arg.dateStr,
      )}&time=${parseDateTime(arg.dateStr)}`,
    );
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;

    if (!event || !event.extendedProps) return;

    const { _id, startTime, first_name, last_name, service, date } =
      event.extendedProps || {};

    return (
      <RenderEventCell
        id={_id}
        startTime={startTime}
        date={date}
        eventDetails={{
          startTime,
          first_name,
          last_name,
          service,
        }}
        className={SlotServiceItem}
      />
    );
  };

  const handleEventClick = (e: EventClickArg) => {
    const { startTime, first_name, last_name, service, date } =
      e?.event?.extendedProps || {};

    const { id } = e.event;

    handleDialogOpen(
      <EventDetails
        id={id}
        startTime={startTime}
        date={date}
        eventDetails={{ first_name, startTime, last_name, service }}
      />,
    );
  };

  const parseAppointmentStart = (date: string, time: string) => {
    return `${date.split('T')[0]}T${time.split('T')[1]}`;
  };

  const handleDatesSet = async (dateInfo: DateQueryArgs) => {
    if (!dateInfo.startStr && !dateInfo.endStr) return;

    const dateType = calendarApi?.view.type;

    if (dateType === CalendarType.timeGridWeek) {
      setCurrentStart(
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_DAY),
      );
      setCurrentEnd(
        ' - ' +
          dayjs(calendarApi?.view.currentStart)
            .add(6, 'days')
            .format(DEFAULT_DATE_FORMAT_DAY),
      );
    } else if (dateType === CalendarType.timeGridDay) {
      setCurrentStart(
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_DAY),
      );
      setCurrentEnd('');
    } else if (dateType === CalendarType.dayGridMonth) {
      setCurrentStart(
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_MONTH),
      );
      setCurrentEnd('');
    }

    const res = await fetch(
      appointmentsUrl(
        new URLSearchParams({
          dateStart: dateInfo.startStr,
          dateEnd: dateInfo.endStr,
        }),
      ),
    );
    res && setAppointments(res);
  };

  const handleOnPrevMonth = () => {
    calendarApi?.prev();
  };

  const handleOnNextMonth = () => {
    calendarApi?.next();
  };

  return (
    <>
      <View fullWidth className={AppointmentsView}>
        <HeaderActions>
          <Breadcrumbs depth={1} values={['Appointments']} />
        </HeaderActions>
        <Grid
          container
          sx={{ justifyContent: 'center' }}
          alignItems="center"
          className={DateNavCn}
        >
          <Grid item xs={2} display="flex" justifyContent="flex-start">
            <IconButton onClick={handleOnPrevMonth} className={DateNavArrow}>
              <PrevMonthIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8} display="flex" justifyContent="center">
            <Grid
              container
              textAlign="center"
              spacing={3}
              justifyContent="center"
            >
              <Typography
                variant="h4"
                width="100%"
                align="center"
                marginBottom={3}
              >
                {currentStart} {currentEnd}
              </Typography>
              <Stack direction="row" spacing={3} justifyContent="center">
                <Button
                  variant="contained"
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.timeGridDay)
                  }
                >
                  {t('day')}
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.timeGridWeek)
                  }
                >
                  {t('week')}
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.dayGridMonth)
                  }
                >
                  {t('month')}
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="flex-end">
            <IconButton onClick={handleOnNextMonth} className={DateNavArrow}>
              <NextMonthIcon />
            </IconButton>
          </Grid>
        </Grid>
        <FullCalendar
          ref={calendarRef}
          eventClassNames={EventCell}
          aspectRatio={2.9}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView={CalendarType.timeGridWeek}
          events={
            appointments?.length
              ? appointments.map((app) => ({
                  id: app._id,
                  title: app.service,
                  allDay: false,
                  start: parseAppointmentStart(app.date, app.time),
                  extendedProps: {
                    first_name: app.first_name,
                    last_name: app.last_name,
                    service: app.service,
                    startTime: formatTime(app.time),
                    date: formatDate(app.date),
                  },
                }))
              : []
          }
          headerToolbar={{
            right: undefined,
            center: undefined,
            left: undefined,
          }}
          views={{
            timeGridDay: {
              slotEventOverlap: false,
              eventMinHeight: 120,
              slotLabelClassNames: SlotLabelDay,
            },
            timeGridWeek: {
              slotEventOverlap: false,
              slotLabelClassNames: SlotLabelWeek,
              dayHeaderContent: (args) =>
                dayjs(args.date).format(DATE_FORMAT_WEEK_VIEW),
            },
            dayGridMonth: {
              dayHeaders: false,
            },
          }}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          buttonText={{
            timeGridWeek: t('week'),
            timeGridDay: t('day'),
          }}
          slotLabelFormat={[
            {
              hour: '2-digit',
              minute: '2-digit',
              omitZeroMinute: false,
              meridiem: false,
              hour12: false,
              hourCycle: 'h24',
            },
          ]}
          slotMinTime={'06:00'}
          slotMaxTime={'22:00'}
          allDaySlot={false}
          nowIndicator
          expandRows
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          firstDay={1}
        />
        <Button
          sx={{ marginTop: '2rem' }}
          variant="contained"
          fullWidth
          onClick={() => router.push('/appointments/add')}
        >
          {t('appointment.new')}
        </Button>
        <Modal open={dialogOpen} onClose={handleDialogClose}>
          {dialogContent}
        </Modal>
      </View>
    </>
  );
};

export default Appointments;

type EventCellDetailsProps = {
  startTime: string;
  first_name: string;
  last_name: string;
  service: string;
};

type EventCellProps = {
  id: string;
  startTime: string;
  date: string;
  eventDetails: EventCellDetailsProps;
  className?: string;
};

const RenderEventCell = ({ eventDetails, className }: EventCellProps) => {
  const { startTime } = eventDetails;

  return (
    <div className={className}>
      <span>{startTime}</span>
    </div>
  );
};

const EventDetails = ({
  id,
  startTime,
  date,
  eventDetails,
}: EventCellProps) => {
  const router = useRouter();

  const { t } = useTranslation(['common', 'appointments']);

  const { _delete } = useDeleteStore();

  const { first_name, last_name, service } = eventDetails;

  const { ModalActions } = styles;

  const handleAppointmentDelete = async (id: string) => {
    const deletedAppointment = await await _delete(deleteAppointmentUrl(id), {
      id,
    });
    if (deletedAppointment) {
      toast.success('Naročilo izbrisano.');
      window.location.reload();
    } else {
      toast.error('Napaka pri brisanju naročila.');
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">
            <CalendarTodayOutlined sx={{ marginRight: 1 }} />
            {date}
            <br /> <TimerOutlined sx={{ marginRight: 1 }} />
            {startTime}
            <br />
            <PersonOutline sx={{ marginRight: 1 }} />
            {first_name} {last_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: '1rem 0' }} />
          <Typography variant="h6">{t('services')}</Typography>
          {service &&
            service.split(',').map((service, index) => (
              <MenuItem key={id ?? index}>
                <ChevronRightOutlined sx={{ marginRight: 1 }} />
                {service}
              </MenuItem>
            ))}
          <Divider sx={{ margin: '1rem 0' }} />
        </Grid>

        <Grid className={ModalActions} container marginTop={2}>
          <Grid item xs={6} textAlign={'center'}>
            <Button
              color="warning"
              variant="contained"
              onClick={() => router.push(`/appointments/edit/${id}`)}
            >
              {t('appointment.edit')}
            </Button>
          </Grid>
          <Grid item xs={6} textAlign={'center'}>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleAppointmentDelete(id)}
            >
              {t('appointment.delete')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
