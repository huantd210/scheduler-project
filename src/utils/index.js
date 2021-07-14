import moment from "moment";

export const getDaysInYear = (year) => {
  return moment([year]).isLeapYear() ? 366 : 365;
};
