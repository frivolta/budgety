import React, { FC } from "react";
import { useField } from "formik";
import Calendar from "react-calendar";
import moment, { utc } from "moment";

interface Props {
  name: string;
}

export const CustomCalendar = ({ name }: Props) => {
  // can pass 'props' into useField also, if 'props' contains a name attribute
  const [field, meta, helpers] = useField((name = name));
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (selectedOption: Date | Date[]) => {
    if (selectedOption instanceof Date) {
      const utcDate = moment.utc(selectedOption).format();
      //console.log(moment(utcDate).toDate());
      setValue(utcDate);
      setTouched(true);
      setError(undefined);
    }
  };

  return <Calendar onChange={(option) => setFieldProps(option)} />;
};
