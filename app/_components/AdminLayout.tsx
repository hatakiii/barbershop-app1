import React, { ReactNode } from "react";
import { SideBar } from "./Sidebar";
import { Header } from "./Header";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <Header />
      <div className="flex flex-col flex-1 mt-16">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
