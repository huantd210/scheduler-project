import moment from "moment";
import { HOLIDAYS, PROJECT_STATUS } from "../constants";

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
  let timeEndProject = moment(project.timeEnd, "YYYY-MM-DD");

  if (project.status === PROJECT_STATUS.finished) {
    timeEndProject = moment(project.timeEnd, "YYYY-MM-DD").add(
      project.guarantee,
      "days"
    );
  }

  if (timeStartProject.isBetween(first, last, undefined, "[]")) return true;
  if (timeEndProject.isBetween(first, last, undefined, "[]")) return true;
  if (
    timeStartProject.isSameOrBefore(first) &&
    timeEndProject.isSameOrAfter(last)
  )
    return true;

  return false;
};
