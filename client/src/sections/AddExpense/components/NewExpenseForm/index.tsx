import React, { useState, useEffect } from "react";
import { Category } from "../../../../types";
import { expenseTypes, categoryTypes } from "../../../../lib/costants";
import { Expense, Option } from "../../../../types";
import {
  defineSelectableCategoriesByExpenseValue,
  getCategoryByCategoryValue,
} from "../../../../lib/utils/categories";
import { ExpenseFormElement } from "./styled";
import {
  CustomInput,
  CustomSelect,
  CurrencyInput,
  CustomButton,
} from "../../../../lib/components";
import { arrayToOption } from "../../../../lib/utils/form";
import { defaultCategories } from "../../../../lib/initialData";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addExpense } from "../../../../lib/api/queries";

interface Props {
  categories: Category[];
  isLoading: boolean;
  handleSubmit: (expense: Expense) => void;
}

const initialExpense: Expense = {
  amount: "0",
  date: new Date(),
  description: "No Description",
  expenseType: expenseTypes[0].id,
  categoryType: categoryTypes[0].id,
  category: defaultCategories[0].value,
};

export const NewExpenseForm = ({
  categories,
  isLoading,
  handleSubmit,
}: Props) => {
  const [selectableCategories, setSelectableCategories] = useState<
    Option[] | undefined
  >(undefined);
  const [expenseValues, setExpenseValues] = useState<Expense>(initialExpense);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  const selectableExpenseTypes = arrayToOption(expenseTypes);

  // Define categories by expenses at start
  useEffect(() => {
    handleExpenseTypeChange("expense");
  }, []);

  useEffect(() => {
    console.log(expenseValues);
  }, [expenseValues]);
  // Filter categories when expense type is changed
  const handleExpenseTypeChange = (value: string) => {
    const filteredCategories = defineSelectableCategoriesByExpenseValue(
      categories,
      value
    );
    const selectableCategoriesUpdated = arrayToOption(filteredCategories);
    setSelectableCategories(selectableCategoriesUpdated);
    setExpenseValues({
      ...expenseValues,
      category: selectableCategoriesUpdated[0].value,
      categoryType: getCategoryByCategoryValue(
        categories,
        selectableCategoriesUpdated[0].value
      ).budgetType,
    });
  };

  const handleCategoryChange = (categoryValue: string) => {
    setExpenseValues({
      ...expenseValues,
      category: categoryValue,
      categoryType: getCategoryByCategoryValue(categories, categoryValue)
        .budgetType,
    });
  };

  const expenseValidation = () => {
    const { amount, description } = expenseValues;
    let isValid = true;
    setAmountError(undefined);
    // Check if amount is valid and remove trailing dots
    if (amount[amount.length - 1] === ".") {
      setExpenseValues({ ...expenseValues, amount: amount.slice(0, -1) });
    }
    if (amount === "0") {
      setAmountError("Amount must be greater 0.");
      isValid = false;
    }
    // Check if description is valid or set default description
    if (description === "") {
      setExpenseValues({
        ...expenseValues,
        description: initialExpense.description,
      });
    }
    return isValid;
  };

  const validateAndSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (expenseValidation()) {
      handleSubmit(expenseValues);
    }
  };

  const selectFieldElements =
    categories && selectableCategories ? (
      <>
        <CustomSelect
          options={selectableCategories}
          name="category"
          onChange={(event) => handleCategoryChange(event.target.value)}
        />
        <CustomSelect
          options={selectableExpenseTypes}
          name="expenseType"
          onChange={(event) => handleExpenseTypeChange(event.target.value)}
        />
      </>
    ) : null;

  const calendarFieldElement = () => (
    <Calendar
      value={expenseValues.date}
      onChange={(newDate) => {
        if (newDate instanceof Date)
          setExpenseValues({ ...expenseValues, date: newDate });
      }}
    />
  );

  const inputFieldElements = () => (
    <>
      <CustomInput
        name="description"
        value={expenseValues.description}
        handleChange={(newDescription) =>
          setExpenseValues({
            ...expenseValues,
            description: newDescription.target.value,
          })
        }
        type="text"
        label="Description"
        placeholder="No description"
      />
    </>
  );

  const amountFieldElement = () => (
    <CurrencyInput
      value={expenseValues.amount}
      name="amount"
      prefix="€ "
      onChange={(newAmount) => {
        if (newAmount) {
          newAmount.replace("€ ", "");
          setAmountError(undefined);
          setExpenseValues({ ...expenseValues, amount: newAmount });
        }
      }}
      label="Amount"
      hasErrors={!!amountError}
      errorMessage={amountError}
    />
  );

  return (
    <ExpenseFormElement onSubmit={(event) => validateAndSend(event)}>
      {selectFieldElements}
      {calendarFieldElement()}
      {amountFieldElement()}
      {inputFieldElements()}
      <CustomButton
        text="Add expense"
        disabled={false}
        margin="32px 0 16px 0"
        isLoading={isLoading}
        data-testid="SubmitButton"
      />
    </ExpenseFormElement>
  );
};
