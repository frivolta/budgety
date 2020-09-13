import { Option } from "../../types";

// Transform an array with {value, caption} to a selectable option array
type ArrayToOption = <T extends { value: string; caption: string }>(
  array: T[]
) => Option[];

export const arrayToOption: ArrayToOption = (arrayToUpdate) => {
  const selectableArray = arrayToUpdate.reduce((accumulator, category) => {
    const selectableArrayItem: Option = {
      label: category.caption,
      value: category.value,
    };

    return accumulator.concat(selectableArrayItem);
  }, [] as Option[]);
  return selectableArray;
};
