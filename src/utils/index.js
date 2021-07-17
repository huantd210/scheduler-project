import moment from "moment";
import { HOLIDAYS } from "../constants/index";

export const getDaysInYear = (year) => {
  return moment([year]).isLeapYear() ? 366 : 365;
};

export const isHoliday = (date) => {
  return HOLIDAYS.some((val) => val === moment(date).format("MM-DD"));
};

export const filterProjects = (projects, start, range = 12) => {
  if (!start) return [];

  const firstTime = moment(start, "YYYY-MM-DD");
  const lastTime = moment(
    moment(start, "YYYY-MM-DD")
      .add(range - 1, "months")
      .endOf("month")
  );

  return projects.filter((it) => isProjectInRangeTime(it, firstTime, lastTime));
};

export const isProjectInRangeTime = (project, first, last) => {
  const timeStartProject = moment(project.timeStart, "YYYY-MM-DD");
  const timeEndProject = moment(project.timeEnd, "YYYY-MM-DD");

  if (timeStartProject.isBetween(first, last, undefined, "[]")) return true;
  if (timeEndProject.isBetween(first, last, undefined, "[]")) return true;
  if (
    timeStartProject.isSameOrBefore(first) &&
    timeEndProject.isSameOrAfter(last)
  )
    return true;

  return false;
};
