import React from "react";
import Dashboard from "../pages/dashboard";
import Employees from "../pages/employees";
import Payroll from "../pages/payroll";
import Attendance from "../pages/attendance";
import Leaves from "../pages/leaves";
import Tasks from "../pages/tasks";
import Updates from "../pages/updates";
import Performance from "../pages/performance";
import Settings from "../pages/settings";

interface RouteConfig {
  path: string;
  title: string;
  component: React.ComponentType;
  showSearchBar?: boolean;
  index?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    title: "Dashboard",
    component: Dashboard,
    index: true,
  },
  {
    path: "/employees",
    title: "Employee Records Management",
    component: Employees,
    showSearchBar: true,
  },
  {
    path: "/payroll",
    title: "Payroll Management",
    component: Payroll,
  },
  {
    path: "/attendance",
    title: "Attendance Recording Management",
    component: Attendance,
  },
  {
    path: "/leaves",
    title: "Employee Leaves Management",
    component: Leaves,
  },
  {
    path: "/tasks",
    title: "Role-Based Task Assignment Management",
    component: Tasks,
  },
  {
    path: "/updates",
    title: "Company Updates Management",
    component: Updates,
  },
  {
    path: "/performance",
    title: "Performance & Bonus Management",
    component: Performance,
  },
  {
    path: "/settings",
    title: "Settings",
    component: Settings,
  },
];
