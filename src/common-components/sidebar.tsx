import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="custom-blue w-64 flex-shrink-0 md:block fixed h-full left-0 top-0">
      <div className="p-6 border-b border-[#4A90C2]">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-lg text-white mb-1">Employee</h2>
          <h2 className="font-bold text-lg text-white">Portal</h2>
        </div>
      </div>
      <nav className="p-4 text-base">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-white/20 text-white border-r-4 border-white' 
                  : 'hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/attendance" 
              className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                isActive('/attendance') 
                  ? 'bg-white/20 text-white border-r-4 border-white' 
                  : 'hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Check In/Out</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/leaves" 
              className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors ${
                isActive('/leaves') 
                  ? 'bg-white/20 text-white border-r-4 border-white' 
                  : 'hover:bg-white/10 text-white/90 hover:text-white'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Leaves</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}