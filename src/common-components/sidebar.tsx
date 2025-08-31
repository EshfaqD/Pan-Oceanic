import {
  LayoutDashboard,
  BarChart,
  Users,
  Briefcase,
  DollarSign,
  ClipboardList,
  MessageSquare,
  Settings,
  Clipboard,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="custom-blue w-64 flex-shrink-0 md:block fixed h-full left-0 top-0">
      <div className="p-6 border-b border-[#365A79]">
        <div className="flex items-center min-height">
          <Link to="/" className="font-bold text-xl">HR Payroll System</Link>
        </div>
      </div>
      <nav className="p-4 text-lg">
        <ul className="space-y-1">
          <li>
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/employees" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <Users className="h-5 w-5" />
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link to="/payroll" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <DollarSign className="h-5 w-5" />
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link to="/leaves" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <Briefcase className="h-5 w-5" />
              <span>Leaves</span>
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <Clipboard className="h-5 w-5" />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link to="/updates" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Updates</span>
            </Link>
          </li>
          <li>
            <Link to="/performance" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <BarChart className="h-5 w-5" />
              <span>Performance</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}