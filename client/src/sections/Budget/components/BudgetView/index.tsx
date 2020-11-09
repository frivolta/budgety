import React, { useState } from "react";
import { Button, Card, RangePicker } from "../../../../lib/components";
import { StyledBudgetViewWrapper } from "./styled";

import { useUserBudget } from "../../../../lib/hooks/useUserBudget";
import { useTheme } from "styled-components/macro";
import { Theme } from "../../../../styles/types";
import { H3 } from "../../../../styles";
import { UserBudget } from "../../../../types";
import { updateUserBudget } from "../../../../lib/api/queries";
import { BUDGET_ERRORS, BUDGET_SUCCESS } from "../../../../lib/messages";
import { toasterError, toasterSuccess } from "../../../../lib/utils/toaster";

interface Props {
  userUid: string;
}

interface IBudgetValues {
  needs: number;
  wants: number;
  savings: number;
}

const MAX_GLOBAL_BUDGET_VALUE = 100;

export const BudgetView = ({ userUid }: Props) => {
  const { userBudget, loading: loadingUserBudget } = useUserBudget();
  const [values, setValues] = useState<IBudgetValues>({
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [currentGlobalValue, setCurrentGlobalValue] = useState(0);
  const [userCanUpdate, setUserCanUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme() as Theme;

  // Set budget values from db values
  const getInitialBudgetValues = React.useCallback(() => {
    if (!loadingUserBudget && userBudget) {
      const { needs, wants, savings } = userBudget;
      const budgetValuesSum = needs + wants + savings;

      setValues({ needs, wants, savings });

      if (budgetValuesSum <= MAX_GLOBAL_BUDGET_VALUE) {
        setCurrentGlobalValue(budgetValuesSum);
      } else {
        throw new Error("[err:]>>>Invalid initial budget");
      }
    }
  }, [loadingUserBudget, userBudget]);

  //Get initial values
  React.useEffect(() => {
    getInitialBudgetValues();
  }, [loadingUserBudget, getInitialBudgetValues]);

  const updateBudgetValues = async () => {
    const budgetValue: UserBudget = {
      needs: values.needs,
      wants: values.wants,
      savings: values.savings,
    };
    const budgetId = userBudget?.id || "";

    try {
      setIsLoading(true);
      await updateUserBudget(userUid, budgetId, budgetValue);
      toasterSuccess(BUDGET_SUCCESS.updateSuccess);
    } catch (err) {
      toasterError(BUDGET_ERRORS.updateError);
      console.error("[err]: Error getting user budget: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   *
   * @param values
   * @param name
   * @param value
   * @returns {globalValue: number, isValid: boolean}
   * @description return a global value object which is the sum of all values and a "isValid" flag
   *
   */
  const getGlobalValue = <T, K extends keyof T>(
    values: T,
    name: K,
    value: number
  ) => {
    const globalValue = Object.keys(values).reduce((acc, key) => {
      if (key !== name) {
        return acc + values[key as keyof unknown];
      }
      return acc + value;
    }, 0);

    return { globalValue, isValid: globalValue <= MAX_GLOBAL_BUDGET_VALUE };
  };

  const handleValueChange = async <T, K extends keyof T>(
    values: T,
    name: K,
    value: number
  ) => {
    const newGlobalValue = getGlobalValue(values, name, value);

    if (newGlobalValue.isValid) {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      setCurrentGlobalValue(newGlobalValue.globalValue);
      setUserCanUpdate(true);
    }
  };

  if (loadingUserBudget) {
    return <p>Loading...</p>;
  }

  const needsColor = {
    color: theme.colors.needs,
    backgroundColor: theme.colors.needsBackground,
  };

  const wantsColor = {
    color: theme.colors.wants,
    backgroundColor: theme.colors.wantsBackground,
  };

  const savingsColor = {
    color: theme.colors.incomes,
    backgroundColor: theme.colors.incomesBackground,
  };

  //@ToDo: Separate those elements in single components
  return (
    <StyledBudgetViewWrapper>
      <H3>Needs</H3>
      <Card>
        <RangePicker
          value={values.needs}
          min={0}
          max={100}
          step={1}
          name="needs"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleValueChange(values, "needs", parseInt(event.target.value))
          }
          color={needsColor.color}
          backgroundColor={needsColor.backgroundColor}
        />
      </Card>
      <H3>Wants</H3>
      <Card>
        <RangePicker
          value={values.wants}
          min={0}
          max={100}
          step={1}
          name="wants"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleValueChange(values, "wants", parseInt(event.target.value))
          }
          color={wantsColor.color}
          backgroundColor={wantsColor.backgroundColor}
        />
      </Card>
      <H3>Savings</H3>
      <Card>
        <RangePicker
          value={values.savings}
          min={0}
          max={100}
          step={1}
          name="savings"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleValueChange(values, "savings", parseInt(event.target.value))
          }
          color={savingsColor.color}
          backgroundColor={savingsColor.backgroundColor}
        />
      </Card>
      <Button
        text="Update budget"
        margin={`${theme.space.max} 0`}
        disabled={!userCanUpdate || currentGlobalValue !== 100 || isLoading}
        handleClick={() => updateBudgetValues()}
        isLoading={isLoading}
      />
    </StyledBudgetViewWrapper>
  );
};
