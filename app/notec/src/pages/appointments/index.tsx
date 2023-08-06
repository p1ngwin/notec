import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import View from "@/components/View";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IAppointment } from "@/types/Appointment";
import { appointmentsUrl } from "@/utils/api/urls";
import styles from "./styles.module.sass";
import { formatTime, parseDateTime } from "@/utils/helpers/utils";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import { Button, MenuItem } from "@mui/material";
import { useFetchStore } from "@/stores/useRequestStore";
import { ChevronRight } from "@mui/icons-material";

const Appointments = () => {
  const { AppointmentsView, EventCell, SlotLabelDay } = styles;

  const { fetch } = useFetchStore();

  const router = useRouter();

  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarApi = calendarRef.current?.getApi();

  const [appointments, setAppointments] = useState<IAppointment[]>();

  useEffect(() => {
    (async () => {
      const res = await fetch(appointmentsUrl());
      res && setAppointments(res);
    })();
  }, [fetch]);

  const handleDateClick = (arg: DateClickArg) => {
    if (!calendarApi) return;

    if (arg.view.type === "timeGridDay" && !arg.allDay) {
      router.push(
        `/appointments/add?date=${parseDateTime(
          arg.dateStr
        )}&time=${parseDateTime(arg.dateStr)}`
      );
    }
    calendarApi.changeView("timeGridDay", arg.dateStr);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;

    if (!event || !event.extendedProps) return;

    const { startTime, first_name, last_name, service } =
      event.extendedProps || {};

    return (
      <RenderEventCell
        start={startTime}
        first_name={first_name}
        last_name={last_name}
        service={service}
      />
    );
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
          initialView="timeGridDay"
          events={
            appointments?.length
              ? appointments.map((app) => ({
                  title: app.service,
                  allDay: false,
                  start: app.date,
                  extendedProps: {
                    first_name: app.first_name,
                    last_name: app.last_name,
                    service: app.service,
                    startTime: formatTime(app.time),
                  },
                }))
              : []
          }
          headerToolbar={{
            right: "prev,timeGridDay,timeGridWeek,dayGridMonth,next",
          }}
          views={{
            dayGrid: {
              // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
            },
            timeGridDay: {
              slotEventOverlap: false,
              eventMinHeight: 120,
              slotLabelClassNames: SlotLabelDay,
            },
            timeGridWeek: {
              slotEventOverlap: false,
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
        />
        <Button
          variant="contained"
          onClick={() => router.push("/appointments/add")}
        >
          Novo naročilo
        </Button>
      </View>
    </>
  );
};

export default Appointments;

type EventCellProps = {
  start: string;
  first_name: string;
  last_name: string;
  service: string;
};
const RenderEventCell = ({
  start,
  first_name,
  last_name,
  service,
}: EventCellProps) => {
  return (
    <div>
      <span>
        {start} - {first_name} {last_name}
        {service.split(",").map((service, index) => (
          <MenuItem
            sx={{ lineHeight: 0.5, padding: 0 }}
            key={index}
          >
            <ChevronRight /> {service}
          </MenuItem>
        ))}
      </span>
    </div>
  );
};
