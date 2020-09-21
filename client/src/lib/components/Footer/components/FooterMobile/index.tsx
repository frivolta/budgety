import React from "react";
import { StyledFooterMobile, SyledFooterIcon } from "./styled";
import { spaceUnit } from "../../../../../styles";
import { IoIosKeypad as DashboardIcon } from "react-icons/io";
import { IoIosAddCircle as AddExpenseIcon } from "react-icons/io";
import { IoIosList as ExpensesList } from "react-icons/io";
import { IoIosColorFilter as BudgetManagement } from "react-icons/io";
import { IoIosCodeWorking as CategoriesManagement } from "react-icons/io";
import { Link } from "react-router-dom";

const ICONS_SIZE = spaceUnit * 2;

export const FooterMobile = () => {
  return (
    <StyledFooterMobile>
      <SyledFooterIcon>
        <Link to="/dashboard">
          <DashboardIcon size={ICONS_SIZE} />
        </Link>
      </SyledFooterIcon>
      <SyledFooterIcon>
        <Link to="/expense-list">
          <ExpensesList size={ICONS_SIZE} />
        </Link>
      </SyledFooterIcon>
      <SyledFooterIcon>
        <Link to="/add-expense">
          <AddExpenseIcon size={ICONS_SIZE} />
        </Link>
      </SyledFooterIcon>
      <SyledFooterIcon>
        <Link to="/categories">
          <CategoriesManagement size={ICONS_SIZE} />
        </Link>
      </SyledFooterIcon>
      <SyledFooterIcon>
        <Link to="/budget">
          <BudgetManagement size={ICONS_SIZE} />
        </Link>
      </SyledFooterIcon>
    </StyledFooterMobile>
  );
};
