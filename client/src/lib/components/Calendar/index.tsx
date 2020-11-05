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
        {DAYS_OF_THE_WEEK.map((d) => (
          <StyledDay key={d}>
            <strong>{d}</strong>
          </StyledDay>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
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
