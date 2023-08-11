import { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const capitalize = (str: string): string => {
  if (!str) return "";

  if (str.length === 0) {
    return str;
  }

  const firstChar = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1).toLowerCase();

  return `${firstChar}${restOfString}`;
};

export const parseDateTime = (input?: string | Dayjs) => {
  // Check if the input is a valid string or Day.js object
  if (typeof input === "string" || input instanceof dayjs) {
    const parsedDate = dayjs(input);

    if (parsedDate) {
      if (parsedDate.isValid()) {
        // Check if the parsed date is valid
        return parsedDate;
      }
    }

    if (dayjs(input, "HH:mm").isValid()) return dayjs(input, "HH:mm");
  }

  // If input is not valid or not provided, return current date and time
  return dayjs();
};

export const formatTime = (input?: string | Dayjs, format?: string) => {
  if (typeof input === "string" || input instanceof dayjs) {
    if (dayjs(input)?.isValid())
      return dayjs(input).format(format ? format : "HH:mm");
  }
  return dayjs().format(format ? format : "HH:mm");
};

export const formatDate = (input?: string | Dayjs, format?: string) => {
  if (typeof input === "string" || input instanceof dayjs) {
    if (dayjs(input)?.isValid())
      return dayjs(input).format(format ? format : "DD.MM.YYYY");
  }
  return dayjs().format(format ? format : "DD.MM.YYYY");
};

export const defaultFetchOptions: RequestInit = {
  mode: "cors",
  cache: "default",
  credentials: "omit",
  headers: {
    "Content-type": "application/json",
  },
};

export const DEFAULT_DATE_FORMAT_MONTH = "MMMM YYYY";

export const DEFAULT_DATE_FORMAT_DAY = "DD.  MMMM YYYY";

export const DATE_FORMAT_DAY_MONTH_LONG = "dddd, DD. MMMM YYYY";

export const DATE_FORMAT_WEEK_VIEW = "ddd, D";
