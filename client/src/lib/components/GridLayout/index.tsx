import React from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  DashboardHeaderContainer,
  DashboardMainContainer,
  DashboardMobileNavigation,
  DashboardSidenavContainer,
} from "./styled";
import { Icon } from "../CustomIcon";
import Header from "../Header";

import addIcon from "./assets/icons/add.svg";
import expensesIcon from "./assets/icons/expenses.svg";
import userIcon from "./assets/icons/user.svg";
import reportIcon from "./assets/icons/report.svg";

interface Props {
  title: string;
  children: React.ReactNode;
}

// @Test
// - Title is present
// - Links are working
// - Page is settings, icon is disabled

export const GridLayout: React.FC<Props> = ({ title, children }) => {
  const [isSettingsPage, setIsSettingsPage] = React.useState(false);
  let history = useHistory();

  // Dashboard links
  const linkAddresses = {
    dashboard: "/dashboard",
    settings: "/settings",
    addExpense: "/add-expense",
    report: "/report",
  };

  React.useEffect(() => {
    // Disable settings button link if page is already settings
    history.location.pathname === linkAddresses.settings
      ? setIsSettingsPage(true)
      : setIsSettingsPage(false);
  }, [history, linkAddresses.settings]);

  // Redirect to page
  const redirectToPage = (link: string): void => {
    history.push(link);
  };

  return (
    <Grid>
      <DashboardHeaderContainer>
        <Header title={title} />
        <Icon
          icon={userIcon}
          onClick={() => redirectToPage(linkAddresses.settings)}
          alt="Settings"
          shadow
          disabled={isSettingsPage}
        />
      </DashboardHeaderContainer>
      <DashboardSidenavContainer isActive={false} />
      <DashboardMainContainer>{children}</DashboardMainContainer>
      <DashboardMobileNavigation>
        <Icon
          onClick={() => redirectToPage(linkAddresses.dashboard)}
          icon={expensesIcon}
          alt="report"
          inverted
        />
        <Icon
          onClick={() => redirectToPage(linkAddresses.addExpense)}
          icon={addIcon}
          alt="add expense"
          shadow
        />
        <Icon
          onClick={() => redirectToPage(linkAddresses.report)}
          icon={reportIcon}
          alt="expenses"
          inverted
        />
      </DashboardMobileNavigation>
    </Grid>
  );
};
