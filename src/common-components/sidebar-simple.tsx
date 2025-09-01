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

export function SidebarSimple() {
  return (
    <aside className="primary w-64 flex-shrink-0 md:block fixed h-full left-0 top-0">
      <div className="p-6 border-b border-[#365A79]">
        <div className="flex items-center min-height">
          <Link to="/" className="font-bold text-xl text-white">HR Payroll System</Link>
        </div>
      </div>
      <nav className="p-4 text-lg">
        <ul className="space-y-1">
          <li>
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <Users className="h-5 w-5" />
              <span>Employees</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <DollarSign className="h-5 w-5" />
              <span>Payroll</span>
            </div>
          </li>
          <li>
            <Link to="/attendance" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white">
              <ClipboardList className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link to="/leaves" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white">
              <Briefcase className="h-5 w-5" />
              <span>Leaves</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <Clipboard className="h-5 w-5" />
              <span>Tasks</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <MessageSquare className="h-5 w-5" />
              <span>Updates</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <BarChart className="h-5 w-5" />
              <span>Performance</span>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#365A79] hover:text-white transition-colors text-white cursor-pointer">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
