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
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressBarColor = (type: string) => {
    switch (type) {
      case "Casual Leave":
        return "bg-blue-500";
      case "Sick Leave":
        return "bg-green-500";
      case "Annual Leave":
        return "bg-purple-500";
      case "Unpaid Leave":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
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
              <p className="text-xl font-semibold text-gray-800 mt-1">18</p>
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
              <p className="text-xl font-semibold text-gray-800 mt-1">2</p>
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
              <p className="text-xl font-semibold text-gray-800 mt-1">5</p>
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
              <p className="text-xl font-semibold text-gray-800 mt-1">1</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Leaves</p>
              <p className="text-xl font-semibold text-gray-800 mt-1">25</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Leave Balance Section - Individual Boxes */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-800">Leave Balance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Casual Leave */}
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Casual Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${calculateProgress(4, 12)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Total: 12</span>
                <span>Balance: 8</span>
              </div>
            </div>
          </div>

          {/* Sick Leave */}
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Sick Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${calculateProgress(2, 10)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Total: 10</span>
                <span>Balance: 8</span>
              </div>
            </div>
          </div>

          {/* Annual Leave */}
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Annual Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${calculateProgress(5, 15)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Total: 15</span>
                <span>Balance: 10</span>
              </div>
            </div>
          </div>

          {/* Unpaid Leave */}
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Unpaid Leave</span>
                <span className="text-sm font-medium text-gray-600">Used: 0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gray-500"
                  style={{ width: `${calculateProgress(0, 1)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Total: ∞</span>
                <span>Balance: 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  From
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  To
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveData.map((leave, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {leave.type}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                    {leave.from}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                    {leave.to}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                    {leave.days}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                    {leave.reason}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
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
