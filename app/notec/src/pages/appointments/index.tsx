import { ReactNode, useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventContentArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import View from '@/components/View';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { IAppointment } from '@/types/Appointment';
import { appointmentsUrl } from '@/utils/api/urls';
import styles from './styles.module.sass';
import {
  DEFAULT_DATE_FORMAT_DAY,
  DEFAULT_DATE_FORMAT_MONTH,
  formatDate,
  formatTime,
  parseDateTime,
} from '@/utils/helpers/utils';
import { useRouter } from 'next/router';
import {
  Grid,
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useFetchStore } from '@/stores/useRequestStore';
import Modal from '@/components/Modal';
import {
  NavigateBefore as PrevMonthIcon,
  NavigateNext as NextMonthIcon,
} from '@mui/icons-material';
import { useDateStore } from '@/stores/useDateStore';
import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import ActionButton from '@/components/ActionButton';
import { EventCellProps } from '@/types/common';
import EventDetails from '@/components/EventDetails';

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
    SlotServiceItem,
    DateNavArrow,
    DateNavCn,
    DayCell,
    SlotLane,
    IsToday,
    NowIndicator,
    SwitcherButton,
    SwitcherActive,
    HeaderCellBlack,
    EventModal,
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
  const [dialogContent, setDialogContent] = useState<ReactNode | null>();

  const [currentStart, setCurrentStart] = useState('');

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
        time={startTime}
        date={date}
        first_name={first_name}
        last_name={last_name}
        service={service}
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
        time={startTime}
        date={date}
        first_name={first_name}
        last_name={last_name}
        service={service}
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
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_MONTH),
      );
    } else if (dateType === CalendarType.timeGridDay) {
      setCurrentStart(
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_DAY),
      );
    } else if (dateType === CalendarType.dayGridMonth) {
      setCurrentStart(
        dayjs(calendarApi?.view.currentStart).format(DEFAULT_DATE_FORMAT_MONTH),
      );
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
      <View fullWidth direction="column" className={AppointmentsView}>
        <Grid
          container
          sx={{ justifyContent: 'center' }}
          alignItems="center"
          className={DateNavCn}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="start"
            alignItems="center"
          >
            <Grid
              xs={3}
              justifyContent="start"
              display="flex"
              alignItems="center"
            >
              <Typography variant="h4">{currentStart}</Typography>
              <IconButton onClick={handleOnPrevMonth} className={DateNavArrow}>
                <PrevMonthIcon />
              </IconButton>
              <IconButton onClick={handleOnNextMonth} className={DateNavArrow}>
                <NextMonthIcon />
              </IconButton>
            </Grid>
            <Grid xs={6} justifyContent={'center'} display="flex">
              <ActionButton
                isPrimary
                onClick={() => router.push('/appointments/add')}
                label={t('appointment.new')}
              />
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="end">
              <ToggleButtonGroup
                value={calendarApi?.view.type}
                exclusive
                aria-label="day alignment"
              >
                <ToggleButton
                  className={classNames(
                    SwitcherButton,
                    calendarApi?.view.type === CalendarType.timeGridDay &&
                      SwitcherActive,
                  )}
                  value={CalendarType.timeGridDay}
                  aria-label="week aligned"
                  sx={{ borderRadius: '25px' }}
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.timeGridDay)
                  }
                >
                  Day
                </ToggleButton>
                <ToggleButton
                  className={classNames(
                    SwitcherButton,
                    calendarApi?.view.type === CalendarType.timeGridWeek &&
                      SwitcherActive,
                  )}
                  value={CalendarType.timeGridWeek}
                  aria-label="centered"
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.timeGridWeek)
                  }
                >
                  Week
                </ToggleButton>
                <ToggleButton
                  className={classNames(
                    SwitcherButton,
                    calendarApi?.view.type === CalendarType.dayGridMonth &&
                      SwitcherActive,
                  )}
                  value={CalendarType.dayGridMonth}
                  aria-label="month aligned"
                  sx={{ borderRadius: '25px' }}
                  onClick={() =>
                    calendarApi?.changeView(CalendarType.dayGridMonth)
                  }
                >
                  Month
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <div className="CalendarWrapper">
          <FullCalendar
            ref={calendarRef}
            eventClassNames={EventCell}
            aspectRatio={1.9}
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
                slotLabelInterval: { hours: 2 },
                dayHeaderContent: (args) => {
                  return <HeaderCell args={args} />;
                },
                dayHeaderClassNames(args) {
                  if (args.isToday) return [HeaderCellBlack];
                  else return [];
                },
              },
              timeGridWeek: {
                slotEventOverlap: false,
                dayHeaderContent: (args) => {
                  return <HeaderCell args={args} />;
                },
                dayHeaderClassNames(args) {
                  if (args.isToday) return [IsToday];
                  else return [];
                },
                dayCellClassNames: DayCell,
                slotLaneClassNames: SlotLane,
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
            slotLabelInterval={{ hours: 2 }}
            slotLabelContent={(renderProps) => {
              return <SlotCell args={renderProps} />;
            }}
            nowIndicatorClassNames={NowIndicator}
          />
        </div>

        <Modal
          open={dialogOpen}
          onClose={handleDialogClose}
          className={EventModal}
        >
          {dialogContent}
        </Modal>
      </View>
    </>
  );
};

export default Appointments;

const RenderEventCell = ({
  time,
  first_name,
  last_name,
  service,
  className,
}: EventCellProps) => {
  const { ServiceText } = styles;

  return (
    <div className={className}>
      <span>{time}</span>
      <br />
      <span className={ServiceText}>
        <b>{service}</b>
      </span>
      <br />
      <span>
        {first_name} {last_name}
      </span>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});

const HeaderCell = ({ args }: any) => {
  const { HeaderCellWrapper, HeaderCellDay, HeaderCellString } = styles;

  const { date } = args;

  const dayNumber = dayjs(date).format('D');
  const dayString = dayjs(date).format('dddd');

  return (
    <div className={`${HeaderCellWrapper}`}>
      <div className={HeaderCellString}>{dayString}</div>
      <div className={HeaderCellDay}>{dayNumber}</div>
    </div>
  );
};

const SlotCell = ({ args }: any) => {
  const { SlotCellClass } = styles;

  return (
    <div className={`${SlotCellClass}`}>
      <div>{args.text}</div>
    </div>
  );
};
