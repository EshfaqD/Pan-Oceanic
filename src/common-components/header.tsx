import { Search, Bell, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  showSearchBar: boolean;
}

export function Header({
  title,
  showSearchBar,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center py-2">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`relative ${showSearchBar ? "visible" : "invisible"}`}
          >
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              disabled={!showSearchBar}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Mail className="h-5 w-5 text-gray-600" />
          </button>
          <Link to="/settings">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          </Link>
          <div className="flex items-center gap-2 ml-4">
            {(() => {
              const userName = "Admin User";
              const firstLetter = userName.charAt(0).toUpperCase();
              return (
                <>
                  <div className="w-8 h-8 rounded-full custom-blue flex items-center justify-center text-sm font-semibold">
                    {firstLetter}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {userName}
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </header>
  );
}