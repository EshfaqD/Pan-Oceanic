import { Calendar, Clock, Bell, FileText, Users, Briefcase, AlertTriangle } from "lucide-react";
import { Header } from "../common-components/header";
import { useState } from "react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div>
      <Header 
        title="Dashboard" 
        showSearchBar={false} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      <div className="p-6 space-y-4">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back, John!</h1>
        <p className="text-sm text-gray-600">{currentDate}</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Today's Status */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Today's Status</p>
              <p className="text-base font-semibold text-gray-800 mt-1">Checked In</p>
              <p className="text-xs text-gray-500">09:15 AM</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Leave Balance</p>
              <p className="text-base font-semibold text-gray-800 mt-1">15 days</p>
              <p className="text-xs text-gray-500">5 days used</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notifications</p>
              <p className="text-base font-semibold text-gray-800 mt-1">2 new</p>
              <p className="text-xs text-gray-500">Last updated 2h ago</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Bell className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Latest Payslip */}
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Latest Payslip</p>
              <p className="text-base font-semibold text-gray-800 mt-1">September 2025</p>
              <p className="text-xs text-gray-500">View details</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Upcoming Events</h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-md border-l-3 border-blue-400">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">Team Meeting</p>
                <p className="text-xs text-gray-600">Today, 2:00 PM - 3:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-md border-l-3 border-yellow-400">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">Project Deadline</p>
                <p className="text-xs text-gray-600">Tomorrow, 5:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-md border-l-3 border-green-400">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5"></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">Company Townhall</p>
                <p className="text-xs text-gray-600">Friday, 10:00 AM - 11:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Updates</h3>
          <div className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 mb-1 text-sm">New Vacation Policy</h4>
              <p className="text-xs text-gray-600 mb-1">Updated guidelines for remote work vacation requests.</p>
              <p className="text-xs text-gray-500">4 days ago</p>
            </div>
            
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 mb-1 text-sm">IT System Maintenance</h4>
              <p className="text-xs text-gray-600 mb-1">Scheduled downtime this weekend.</p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-1 text-sm">Q4 Goals Announcement</h4>
              <p className="text-xs text-gray-600 mb-1">CEO shares company targets for Q4.</p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
