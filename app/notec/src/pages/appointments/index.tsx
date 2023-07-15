import { IPerson } from "@/types/person/Person";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import View from "@/components/View";

const Appointments = () => {
  const [persons, setPersons] = useState<IPerson[]>();

  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <span>test</span>
      </>
    );
  }

  return (
    <View FullWidth>
      <h1>Urnik</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2023-07-15" },
          { title: "event 2", date: "2019-04-02" },
        ]}
        eventContent={renderEventContent}
      />
    </View>
  );
};

export default Appointments;
