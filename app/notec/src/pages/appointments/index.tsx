import { ReactNode, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import View from "@/components/View";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IAppointment } from "@/types/Appointment";
import { appointmentsUrl, deleteAppointmentUrl } from "@/utils/api/urls";
import styles from "./styles.module.sass";
import { formatDate, formatTime, parseDateTime } from "@/utils/helpers/utils";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import { Button, Divider, Grid, MenuItem, Typography } from "@mui/material";
import { useDeleteStore, useFetchStore } from "@/stores/useRequestStore";
import Modal from "@/components/Modal";
import {
  ChevronRightOutlined,
  CalendarTodayOutlined,
  TimerOutlined,
  PersonOutline,
} from "@mui/icons-material";
import toast from "react-hot-toast";

type DateQueryArgs = {
  endStr: string;
  startStr: string;
};

const Appointments = () => {
  const {
    AppointmentsView,
    EventCell,
    SlotLabelDay,
    SlotLabelWeek,
    SlotServiceItem,
  } = styles;

  const { fetch } = useFetchStore();

  const router = useRouter();

  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarApi = calendarRef.current?.getApi();

  const [appointments, setAppointments] = useState<IAppointment[]>();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const handleDialogOpen = (content: ReactNode) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDateClick = (arg: DateClickArg) => {
    if (!calendarApi) return;

    // TODO: will se about that
    //if (arg.view.type === "timeGridDay" && !arg.allDay) {
    router.push(
      `/appointments/add?date=${parseDateTime(
        arg.dateStr
      )}&time=${parseDateTime(arg.dateStr)}`
    );
    //}
    //calendarApi.changeView("timeGridDay", arg.dateStr);
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

    console.log(id);
    handleDialogOpen(
      <EventDetails
        id={id}
        startTime={startTime}
        date={date}
        eventDetails={{ first_name, startTime, last_name, service }}
      />
    );
  };

  const parseAppointmentStart = (date: string, time: string) => {
    return `${date.split("T")[0]}T${time.split("T")[1]}`;
  };

  const handleDatesSet = async (dateInfo: DateQueryArgs) => {
    const res = await fetch(
      appointmentsUrl(
        new URLSearchParams({
          dateStart: dateInfo.startStr,
          dateEnd: dateInfo.endStr,
        })
      )
    );
    res && setAppointments(res);
  };

  return (
    <>
      <View
        fullWidth
        className={AppointmentsView}
      >
        <HeaderActions>
          <Breadcrumbs
            depth={1}
            values={["Naročila"]}
          />
        </HeaderActions>
        <FullCalendar
          ref={calendarRef}
          eventClassNames={EventCell}
          aspectRatio={2.5}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
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
            right: "prev,timeGridDay,timeGridWeek,dayGridMonth,next",
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
            },
          }}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          buttonText={{
            timeGridWeek: "Teden",
            timeGridDay: "Dan",
          }}
          slotLabelFormat={[
            {
              hour: "2-digit",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: false,
              hour12: false,
              hourCycle: "h24",
            },
          ]}
          slotMinTime={"06:00"}
          slotMaxTime={"22:00"}
          allDaySlot={false}
          nowIndicator
          expandRows
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
        />
        <Button
          sx={{ marginTop: "2rem" }}
          variant="contained"
          fullWidth
          onClick={() => router.push("/appointments/add")}
        >
          Novo naročilo
        </Button>
        <Modal
          open={dialogOpen}
          onClose={handleDialogClose}
        >
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

  const { _delete } = useDeleteStore();

  const { first_name, last_name, service } = eventDetails;

  const { ModalActions } = styles;

  const handleAppointmentDelete = async (id: string) => {
    const deletedAppointment = await await _delete(deleteAppointmentUrl(id), {
      id,
    });
    if (deletedAppointment) {
      toast.success("Naročilo izbrisano.");
      window.location.reload();
    } else {
      toast.error("Napaka pri brisanju naročila.");
    }
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
        >
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
        <Grid
          item
          xs={12}
        >
          <Divider sx={{ margin: "1rem 0" }} />
          <Typography variant="h6">Storitve</Typography>
          {service &&
            service.split(",").map((service, index) => (
              <MenuItem key={id ?? index}>
                <ChevronRightOutlined sx={{ marginRight: 1 }} />
                {service}
              </MenuItem>
            ))}
          <Divider sx={{ margin: "1rem 0" }} />
        </Grid>

        <Grid
          className={ModalActions}
          container
          marginTop={2}
        >
          <Grid
            item
            xs={6}
            textAlign={"center"}
          >
            <Button
              color="warning"
              variant="contained"
              onClick={() => router.push(`/appointments/edit/${id}`)}
            >
              Uredi naročilo
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            textAlign={"center"}
          >
            <Button
              color="error"
              variant="contained"
              onClick={() => handleAppointmentDelete(id)}
            >
              Izbriši naročilo
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
