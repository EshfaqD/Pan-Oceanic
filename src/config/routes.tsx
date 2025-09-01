import React from "react";
import Dashboard from "../pages/dashboard";
import Attendance from "../pages/attendance";
import Leaves from "../pages/leaves";

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
    path: "/attendance",
    title: "Check In/Out",
    component: Attendance,
  },
  {
    path: "/leaves",
    title: "Leave Management",
    component: Leaves,
  },
];
