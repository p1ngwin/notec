export enum CalendarType {
  timeGridDay = 'timeGridDay',
  timeGridWeek = 'timeGridWeek',
  dayGridMonth = 'dayGridMonth',
}

export type EventCellDetailsProps = {
  startTime: string;
  first_name: string;
  last_name: string;
  service: string;
};

export type EventCellProps = {
  id: string;
  first_name: string;
  last_name: string;
  date: string;
  time: string;
  service: string;
  className?: string;
};
