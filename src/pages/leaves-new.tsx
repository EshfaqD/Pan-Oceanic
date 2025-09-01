import { Calendar, Clock, CheckCircle, XCircle, FileText, Plus } from "lucide-react";
import { Header } from "../common-components/header";
import { useState } from "react";
import Button from "../common-components/button";

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const leaveData = [
    {
      type: "Casual Leave",
      from: "2023-03-15",
      to: "2023-03-16",
      days: 2,
      reason: "Family event",
      status: "Approved"
    },
    {
      type: "Sick Leave",
      from: "2023-04-10",
      to: "2023-04-10",
      days: 1,
      reason: "Not feeling well",
      status: "Approved"
    },
    {
      type: "Annual Leave",
      from: "2023-05-20",
      to: "2023-05-24",
      days: 5,
      reason: "Vacation",
      status: "Pending"
    },
    {
      type: "Casual Leave",
      from: "2023-06-05",
      to: "2023-06-05",
      days: 1,
      reason: "Personal work",
      status: "Rejected"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const calculateProgress = (used: number, total: number) => {
    return (used / total) * 100;
  };

  return (
    <div>
      <Header 
        title="Leaves" 
        showSearchBar={false} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      <div className="p-6 space-y-4">
        {/* Header with Breadcrumb and Request Leave Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Leaves</span>
          </div>
          <Button 
            label="Request Leave"
            variant="btn-primary"
            icon={<Plus className="h-4 w-4" />}
          />
        </div>

        {/* Leave Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Available Leaves</p>
                <p className="card-number mt-1">18</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending Leaves</p>
                <p className="card-number mt-1">2</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Approved Leaves</p>
                <p className="card-number mt-1">5</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Rejected Leaves</p>
                <p className="card-number mt-1">1</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Leaves</p>
                <p className="card-number mt-1">25</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Leave Balance Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-800">Leave Balance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Casual Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(4, 12)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>0</span>
                <span>12</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Sick Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(2, 10)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Annual Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(5, 15)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>0</span>
                <span>15</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Unpaid Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-gray-400 h-2 rounded-full w-0"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>0</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Leave Requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveData.map((leave, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{leave.days}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{leave.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                        {getStatusIcon(leave.status)}
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
