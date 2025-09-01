import { Bell, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  showSearchBar?: boolean;
}

export function Header({
  title,
  showSearchBar = false,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center py-2">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </button>

          {/* Employee Profile Section */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full custom-blue flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">John Doe</span>
                <span className="text-xs text-gray-500">Software Engineer</span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-2">
              <LogOut className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}