import { DEFAULT_DATE_FORMAT_MONTH } from "@/utils/helpers/utils";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateStore {
  selectedDate: string | null;
  setSelectedDate: (newDate: string) => void;
  setNextMonth: () => void;
  setPrevMonth: () => void;
  getSelectedDate: () => string;
  getSelectedMonth: () => string;
}

export const useDateStore = create<DateStore>()(
  persist(
    (set, get) => ({
      selectedDate: dayjs().toString(),
      setSelectedDate: (newDate) => {
        set({ selectedDate: newDate });
      },
      setNextMonth: () =>
        set((state) => ({
          selectedDate: dayjs(state.selectedDate)
            .add(1, "month")
            .startOf("month")
            .add(1, "day")
            .toString(),
        })),
      setPrevMonth: () =>
        set((state) => ({
          selectedDate: dayjs(state.selectedDate)
            .add(-1, "month")
            .startOf("month")
            .add(1, "day")
            .toString(),
        })),
      getSelectedMonth: () =>
        dayjs(get().selectedDate).format(DEFAULT_DATE_FORMAT_MONTH),
      getSelectedDate: () => dayjs(get().selectedDate).toString(),
    }),
    {
      name: "date-storage",
    }
  )
);
