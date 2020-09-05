import React from "react";
import Calendar from "react-calendar";
import moment, { utc } from "moment";

interface Props {
  name: string;
}

export const CustomCalendar = ({ name }: Props) => {
  // can pass 'props' into useField also, if 'props' contains a name attribute

  const defaultValue = new Date();

  const setFieldProps = (selectedOption: Date | Date[]) => {
    if (selectedOption instanceof Date) {
      const utcDate = moment.utc(selectedOption).format();
      //console.log(moment(utcDate).toDate());
      //setValue(utcDate);
      //setTouched(true);
      //setError(undefined);
    }
  };

  return (
    <Calendar
      onChange={(option) => setFieldProps(option)}
      defaultValue={defaultValue}
    />
  );
};
