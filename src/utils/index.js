import moment from "moment";
import { HOLIDAYS } from "../constants/index";

export const getDaysInYear = (year) => {
  return moment([year]).isLeapYear() ? 366 : 365;
};

export const isHoliday = (date) => {
  return HOLIDAYS.some((val) => val === moment(date).format("MM-DD"));
};
