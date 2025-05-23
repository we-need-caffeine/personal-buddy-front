import { useState } from "react";

export const useScheduleForm = () => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const setStartAndEndFromDate = (isoStart, isoEnd) => {
    const toDate = (str) => str.slice(0, 10);
    const toTime = (str) => str.slice(11, 16);

    setStartDate(toDate(isoStart));
    setStartTime(toTime(isoStart));
    setEndDate(toDate(isoEnd));
    setEndTime(toTime(isoEnd));
  };

  return {
    startDate, startTime, endDate, endTime,
    setStartDate, setStartTime, setEndDate, setEndTime,
    setStartAndEndFromDate,
  };
};
