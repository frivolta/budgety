import React, { useState, useEffect } from "react";
import { Category } from "../../../../types";
import { useForm, Controller } from "react-hook-form";
import { expenseTypes } from "../../../../lib/costants";
import { Expense, Option } from "../../../../types";
import { defineSelectableCategoriesByExpenseValue } from "../../../../lib/utils/categories";
import { ExpenseFormElement } from "./styled";
import {
  CustomInput,
  CustomSelect,
  CustomButton,
  CustomCalendar,
} from "../../../../lib/components";
import { arrayToOption } from "../../../../lib/utils/form";

interface Props {
  categories: Category[];
}

export const NewExpenseForm = ({ categories }: Props) => {
  const { register, handleSubmit, control } = useForm<Expense>();
  const [selectableCategories, setSelectableCategories] = useState<
    Option[] | undefined
  >(undefined);

  // Define categories by expenses at start
  useEffect(() => {
    handleExpenseTypeChange("expense");
  }, []);

  // Filter categories when expense type is changed
  const handleExpenseTypeChange = (value: string) => {
    const filteredCategories = defineSelectableCategoriesByExpenseValue(
      categories,
      value
    );
    const selectableCategoriesUpdated = arrayToOption(filteredCategories);
    setSelectableCategories(selectableCategoriesUpdated);
  };

  function onSubmit(data: Expense) {
    console.log(data);
  }

  return (
    <ExpenseFormElement onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        register={register}
        name="Description"
        label="Description"
        placeholder="Description..."
        type="text"
      />
      {selectableCategories ? (
        <CustomSelect
          name="category"
          register={register}
          options={selectableCategories}
        />
      ) : null}
      {selectableCategories ? (
        <CustomSelect
          name="expenseType"
          register={register}
          options={arrayToOption(expenseTypes)}
          onChange={(event) => handleExpenseTypeChange(event.target.value)}
        />
      ) : null}
      <Controller
        render={() => <CustomCalendar name="date" />}
        defaultValue={new Date()}
        name="date"
        control={control}
      />
      <CustomButton
        text="Add new expense"
        margin="32px 0 16px 0"
        data-testid="SubmitButton"
      />
    </ExpenseFormElement>
  );
};
