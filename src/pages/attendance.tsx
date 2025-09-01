import { Clock, MapPin, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../common-components/header";
import Button from "../common-components/button";

const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showRemoteVerification, setShowRemoteVerification] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const weeklyData = [
    { day: 'Mon', hours: 8.5, percentage: 85 },
    { day: 'Tue', hours: 8.2, percentage: 82 },
    { day: 'Wed', hours: 7.8, percentage: 78 },
    { day: 'Thu', hours: 8.0, percentage: 80 },
    { day: 'Fri', hours: 7.2, percentage: 72 },
    { day: 'Sat', hours: 0, percentage: 0 },
    { day: 'Sun', hours: 0, percentage: 0 }
  ];

  const recentActivity = [
    {
      date: "2023-09-14",
      checkIn: "09:02:45",
      checkOut: "17:30:12",
      workHours: "8h 27m",
      location: "Office",
      status: "Completed"
    },
    {
      date: "2023-09-13",
      checkIn: "09:15:33",
      checkOut: "18:05:47",
      workHours: "8h 50m",
      location: "Remote",
      status: "Completed"
    },
    {
      date: "2023-09-12",
      checkIn: "09:00:12",
      checkOut: "17:45:23",
      workHours: "8h 45m",
      location: "Office",
      status: "Completed"
    }
  ];

  const todayActivity = [
    { type: "Checked Out", time: "12:30 PM", description: "Went for lunch break" },
    { type: "Checked In", time: "1:15 PM", description: "Back from lunch break" },
    { type: "Checked Out", time: "5:00 PM", description: "End of work day" },
    { type: "Checked In", time: "9:00 AM", description: "Work from Office" }
  ];

  return (
    <div>
      <Header 
        title="Attendance" 
        showSearchBar={false} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      <div className="p-6 space-y-4">
      {/* Header with Real-time Date & Time */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Attendance</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">{formatDate(currentTime)}</p>
          <p className="text-2xl font-semibold text-blue-600">{formatTime(currentTime)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Attendance Section */}
        <div className="lg:col-span-3 space-y-5">
          {/* Attendance Tracking Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Attendance Tracking</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Live Tracking</span>
              </div>
            </div>
            
            {/* Check In/Out Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">Check In</h3>
                <p className="text-sm text-gray-600 mb-3">Start your work day</p>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Check In Time</p>
                  <p className="text-lg font-semibold text-gray-800">--:--:--</p>
                </div>
                <Button 
                  label="Check In Now"
                  variant="btn-accent-success"
                  onClick={() => setShowRemoteVerification(true)}
                  className="w-full"
                />
              </div>
              
              <div className="text-center p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">Check Out</h3>
                <p className="text-sm text-gray-600 mb-3">End your work day</p>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Check Out Time</p>
                  <p className="text-lg font-semibold text-gray-800">--:--:--</p>
                </div>
                <Button 
                  label="Check Out Now"
                  variant="btn-accent-danger"
                  onClick={() => setIsCheckedIn(false)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Remote Work Verification Modal/Alert */}
            {showRemoteVerification && (
              <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-yellow-800 mb-2">Remote Work Verification</h4>
                    <p className="text-sm text-yellow-700 mb-4">
                      Your location has been verified for remote work. Please ensure you're attending during working hours and have a stable internet connection.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        label="Confirm Check In"
                        variant="btn-accent-deep"
                        onClick={() => {
                          setShowRemoteVerification(false);
                          setIsCheckedIn(true);
                        }}
                      />
                      <Button 
                        label="Cancel"
                        variant="btn-neutral"
                        onClick={() => setShowRemoteVerification(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <span className="text-sm text-gray-500">Last 3 days</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Work Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivity.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{activity.date}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{activity.checkIn}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{activity.checkOut}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{activity.workHours}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200">
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Weekly Hours Chart */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Weekly Hours</h3>
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">This Week</span>
            </div>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 w-8">{day.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${day.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-8 text-right">{day.hours}h</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 -mx-5 px-5 rounded-b-xl">
              <div className="grid grid-cols-1 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Hours</p>
                  <p className="text-lg font-bold text-gray-800">39.7h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Average Daily</p>
                  <p className="text-lg font-bold text-gray-800">7.9h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Today Activity */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Today's Activity</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">View All</button>
            </div>
            <div className="space-y-3">
              {todayActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'Checked In' ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                  }`}>
                    {activity.type === 'Checked In' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Attendance;
