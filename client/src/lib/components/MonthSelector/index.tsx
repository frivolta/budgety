import React, { useState } from "react";
import {
  MonthSelectorMonthsContainer,
  MonthSelectorMonthsTag,
  MonthSelectorWrapper,
  MonthsTag,
} from "./styled";

interface Props {
  currentDate: Date;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MonthSelector = ({ currentDate }: Props) => {
  // Set date of currentDate -1 month -2 month, +1 month, +2 month

  /**
   * Get month number, if it is above December start from January
   * @param date - current date
   * @param offset - positive or negative offset
   */
  const getMonth = (date: Date, offset: number = 0) => {
    const totalMonths = 11;
    const dateMonth = date.getMonth() + offset;
    return dateMonth <= totalMonths ? dateMonth : dateMonth - totalMonths - 1;
  };

  return (
    <MonthSelectorWrapper>
      <MonthSelectorMonthsContainer>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <MonthsTag>{MONTHS[getMonth(currentDate, -2)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <MonthsTag>{MONTHS[getMonth(currentDate, -1)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")} isActive>
          <MonthsTag>{MONTHS[getMonth(currentDate)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <MonthsTag>{MONTHS[getMonth(currentDate, 1)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <MonthsTag>{MONTHS[getMonth(currentDate, 2)]}</MonthsTag>
        </MonthSelectorMonthsTag>
      </MonthSelectorMonthsContainer>
    </MonthSelectorWrapper>
  );
};
