import React from "react";
import {
  MonthSelectorMonthsContainer,
  MonthSelectorMonthsTag,
  MonthSelectorWrapper,
  MonthsTag,
  YearTag,
} from "./styled";

interface Props {
  currentDate: Date;
  handleChangeDate: (date: Date) => void;
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

export const MonthSelector = ({ currentDate, handleChangeDate }: Props) => {
  /**
   * Get month number, if it is above December start from January
   * @param date - current date
   * @param offset - positive or negative offset
   */
  const getMonth = (date: Date, offset: number = 0) => {
    const totalMonths = 11;
    const dateMonth = date.getMonth() + offset;

    // If month is between 0 and 11
    if (dateMonth <= totalMonths && dateMonth >= 0) {
      return dateMonth;
    }

    // If month is above 11
    if (dateMonth > totalMonths) {
      return dateMonth - totalMonths - 1;
    }

    // If month is less than 0 -> the other cases
    return totalMonths + dateMonth + 1;
  };

  const handleSelection = (month: number, year: number) => {
    const selectedDate = new Date(year, month, 1);
    handleChangeDate(selectedDate);
  };

  return (
    <MonthSelectorWrapper>
      {/*Years*/}
      <MonthSelectorMonthsContainer>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <YearTag>{currentDate.getFullYear() - 1}</YearTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")} isActive>
          <YearTag>{currentDate.getFullYear()}</YearTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag onClick={() => console.log("clicked")}>
          <YearTag>{currentDate.getFullYear() + 1}</YearTag>
        </MonthSelectorMonthsTag>
      </MonthSelectorMonthsContainer>
      {/*Months*/}
      <MonthSelectorMonthsContainer>
        <MonthSelectorMonthsTag
          onClick={() =>
            handleSelection(
              getMonth(currentDate, -2),
              currentDate.getFullYear()
            )
          }
        >
          <MonthsTag>{MONTHS[getMonth(currentDate, -2)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag
          onClick={() =>
            handleSelection(
              getMonth(currentDate, -1),
              currentDate.getFullYear()
            )
          }
        >
          <MonthsTag>{MONTHS[getMonth(currentDate, -1)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag
          onClick={() =>
            handleSelection(getMonth(currentDate), currentDate.getFullYear())
          }
          isActive
        >
          <MonthsTag>{MONTHS[getMonth(currentDate)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag
          onClick={() =>
            handleSelection(getMonth(currentDate, 1), currentDate.getFullYear())
          }
        >
          <MonthsTag>{MONTHS[getMonth(currentDate, 1)]}</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag
          onClick={() =>
            handleSelection(getMonth(currentDate, 2), currentDate.getFullYear())
          }
        >
          <MonthsTag>{MONTHS[getMonth(currentDate, 2)]}</MonthsTag>
        </MonthSelectorMonthsTag>
      </MonthSelectorMonthsContainer>
    </MonthSelectorWrapper>
  );
};
