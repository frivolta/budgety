import * as React from "react";
import { useSidebar, UseSidebar } from "./useSidebar";

interface Props {
  children: React.ReactNode;
}

// Generate context
const SidebarContext = React.createContext<UseSidebar>(undefined!);

// Generate provider
const SidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useSidebar(true);

  return (
    <SidebarContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom context hook
const useSidebarContext = () => {
  return React.useContext(SidebarContext);
};

export { SidebarProvider, useSidebarContext };
