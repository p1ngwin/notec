import classNames from "classnames";
import styles from "./styles.module.sass";
import { Grid, IconButton, Typography } from "@mui/material";
import {
  NavigateBefore as PrevMonthIcon,
  NavigateNext as NextMonthIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDateStore } from "@/stores/useDateStore";
import dayjs from "dayjs";

type Props = {
  className?: string | string[];
  fullWidth?: boolean;
  onPrevMonth?: (date: string) => void;
  onNextMonth?: (date: string) => void;
  onDateSelected?: () => void;
};

const DateNav = ({
  className,
  fullWidth,
  onPrevMonth,
  onNextMonth,
  onDateSelected,
}: Props) => {
  const { DateNav, FullWidth, DatePickerIconOnly, DateNavArrow } = styles;

  const {
    getSelectedDate,
    getSelectedMonth,
    setSelectedDate,
    setNextMonth,
    setPrevMonth,
  } = useDateStore();

  const DateNavCn = classNames([className, DateNav], {
    [FullWidth]: Boolean(fullWidth),
  });

  const handleOnPrevMonth = () => {
    setPrevMonth();
    onPrevMonth && onPrevMonth(getSelectedDate());
  };

  const handleOnNextMonth = () => {
    setNextMonth();
    onNextMonth && onNextMonth(getSelectedDate());
  };

  const handleOnDateSelected = (date: Date | null) => {
    setSelectedDate(dayjs(date).add(1, "day").toString());
    onDateSelected && onDateSelected();
  };

  return (
    <Grid
      container
      sx={{ justifyContent: "center" }}
      className={DateNavCn}
      alignItems="center"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          item
          xs={2}
          display="flex"
          justifyContent="flex-start"
        >
          <IconButton
            onClick={handleOnPrevMonth}
            className={DateNavArrow}
          >
            <PrevMonthIcon />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={8}
          display="flex"
        >
          <Typography
            variant="h4"
            width="100%"
            align="right"
          >
            {getSelectedMonth()}
          </Typography>
          <DatePicker<Date>
            className={DatePickerIconOnly}
            onChange={(date) => handleOnDateSelected(date)}
            slotProps={{
              actionBar: { actions: ["today"] },
            }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          justifyContent="flex-end"
        >
          <IconButton
            onClick={handleOnNextMonth}
            className={DateNavArrow}
          >
            <NextMonthIcon />
          </IconButton>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
};

export default DateNav;
