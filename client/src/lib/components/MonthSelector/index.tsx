import React from "react";
import {
  ArrowButton,
  MonthSelectorMonthsContainer,
  MonthSelectorMonthsTag,
  MonthSelectorWrapper,
  MonthsTag,
} from "./styled";

interface Props {
  currentMonth: Date;
}

export const MonthSelector = ({ currentMonth }: Props) => {
  return (
    <MonthSelectorWrapper>
      <MonthSelectorMonthsContainer>
        <ArrowButton>{`<`}</ArrowButton>
        <MonthSelectorMonthsTag>
          <MonthsTag>Oct</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag isActive>
          <MonthsTag>Nov</MonthsTag>
        </MonthSelectorMonthsTag>
        <MonthSelectorMonthsTag>
          <MonthsTag>Dec</MonthsTag>
        </MonthSelectorMonthsTag>
        <ArrowButton>{`>`}</ArrowButton>
      </MonthSelectorMonthsContainer>
    </MonthSelectorWrapper>
  );
};
