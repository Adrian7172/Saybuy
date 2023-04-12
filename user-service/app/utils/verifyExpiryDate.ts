import dayjs from "dayjs";

export function timeDifference(from: Date, to: Date, type: "d" | "h" | "m") {
  const startDate = dayjs(from);
  return startDate.diff(dayjs(to), type, true);
}
