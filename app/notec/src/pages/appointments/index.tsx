import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import View from "@/components/View";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { IAppointment } from "@/types/Appointment";
import { fetchData } from "@/utils/api/fetch";
import { appointmentsUrl } from "@/utils/api/urls";
import styles from "./styles.module.sass";
import { capitalize } from "@/utils/helpers/utils";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/Breadcrumbs";
import moment from "moment";

const Appointments = () => {
  const { AppointmentsView, EventCell, Service } = styles;

  const router = useRouter();

  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarApi = calendarRef.current?.getApi();

  const [appointments, setAppointments] = useState<IAppointment[]>();

  useEffect(() => {
    (async () => {
      const res = await fetchData(appointmentsUrl());
      res && setAppointments(res);
    })();
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    if (!calendarApi) return;

    if (arg.view.type === "timeGridDay" && !arg.allDay) {
      router.push(`/appointments/add?date=${arg.dateStr}&time=${arg.dateStr}`);
    }
    calendarApi.changeView("timeGridDay", arg.dateStr);
  };

  function renderEventContent(eventInfo: any) {
    const { event } = eventInfo;

    if (!event) return;

    return (
      <div>
        <b>{event.extendedProps?.startTime}</b>
        <span>
          &nbsp;- {event.extendedProps.first_name}
          &nbsp;{event.extendedProps.last_name}
        </span>
        <span className={Service}>
          <br />
          &nbsp;
          <span>{capitalize(event.extendedProps.service)}</span>
        </span>
      </div>
    );
  }

  return (
    <View
      fullWidth
      className={AppointmentsView}
    >
      <Breadcrumbs depth={2} />
      <FullCalendar
        ref={calendarRef}
        eventClassNames={EventCell}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={
          appointments?.length
            ? appointments.map((app) => ({
                title: app.service,
                date: app.date,
                allDay: false,
                start: app.time,
                end: app.time + 1,
                extendedProps: {
                  first_name: app.first_name,
                  last_name: app.last_name,
                  service: app.service,
                  startTime: moment(app.time)?.format("HH:mm"),
                },
              }))
            : []
        }
        eventContent={renderEventContent}
        selectable
        dateClick={handleDateClick}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
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
        // Ugly solution for displaying 00:00 instead of 24:00
        slotLabelContent={(arg) => {
          if (arg.text === "24:00") return "00:00";
          return arg.text;
        }}
        nowIndicator
      />
    </View>
  );
};

export default Appointments;
