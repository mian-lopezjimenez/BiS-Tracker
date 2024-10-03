import { differenceInHours } from "date-fns";

const getDateHoursDifference = (
  firstDate: Date,
  secondDate: Date,
  hours: number
): boolean => {
  const hourDifference = differenceInHours(firstDate, secondDate);

  return Math.abs(hourDifference) >= hours;
};

export { getDateHoursDifference };
