import React, { useState, useEffect } from "react";
import {
  StyledBody,
  StyledDay,
  StyledButton,
  StyledFrame,
  StyledHeader,
} from "./styled";

interface Props {}

/**Mapping days, months constats */
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_OF_THE_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  // Elements
  const weekDaysElement = () => {
    return DAYS_OF_THE_WEEK.map((dayName, index) => (
      <StyledDay key={index}>{dayName}</StyledDay>
    ));
  };

  const daysNumberElement = () => {
    // Get filler days, the number of days before the first day to show as blank
    // Since sunday is rapresented by "0", if the day is sunday it corresponds to "0-1 = 6"
    const fillerDays = startDay === 0 ? 6 : startDay - 1;
    // Create an array with the right number of days (eg. November: DAYS[10] = 30)
    const daysInMonthArray = Array(DAYS[month] + fillerDays).fill(null);

    //a) Loop daysInMonthArray, if index is less than fillerDays - 1 (?) then print a filler element (action is disabled, content is null) else print the correct day in the month
    //b) Loop fillerDays and print null, loop daysInMonth and print the day

    //Check if the day selected corresponds to the current day date
  };

  daysNumberElement();
  return (
    <StyledFrame>
      <StyledHeader>
        <StyledButton onClick={() => setDate(new Date(year, month - 1, day))}>
          Prev
        </StyledButton>
        <div>
          {MONTHS[month]} {year}
        </div>
        <StyledButton onClick={() => setDate(new Date(year, month + 1, day))}>
          Next
        </StyledButton>
      </StyledHeader>
      <StyledBody>
        {weekDaysElement()}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay === 0 ? 5 : startDay - 2);
            return (
              <StyledDay
                key={index}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ""}
              </StyledDay>
            );
          })}
      </StyledBody>
    </StyledFrame>
  );
};
