import { Calendar, Clock, CheckCircle, XCircle, FileText, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Header } from "../common-components/header";
import { useState, useEffect } from "react";
import Button from "../common-components/button";
import { Modal } from "../common-components/modal";

interface LeaveRequest {
  _id?: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LeaveBalance {
  used: number;
  balance: number;
  total: number;
}

interface LeaveBalances {
  casual: LeaveBalance;
  sick: LeaveBalance;
  annual: LeaveBalance;
  unpaid: LeaveBalance;
}

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalances | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Confirmation modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    type: 'blue' as 'blue' | 'red' | 'orange'
  });
  
  const [formData, setFormData] = useState({
    type: '',
    from: '',
    to: '',
    days: 0,
    reason: ''
  });
  
  // Fetch leaves data from backend
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/leaves/?userId=user123');
      if (response.ok) {
        const data = await response.json();
        setLeaveRequests(data.leaveRequests || []);
        setLeaveBalances(data.leaveBalances || null);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Delete leave request
  const handleDeleteLeave = async (leaveId: string) => {
    console.log('Delete button clicked for leaveId:', leaveId); // Debug log
    setConfirmModal({
      isOpen: true,
      title: 'Cancel Leave Request',
      message: 'Are you sure you want to cancel this leave request? This action cannot be undone.',
      type: 'red',
      confirmText: 'Yes, Cancel',
      onConfirm: () => confirmDeleteLeave(leaveId)
    });
  };

  const confirmDeleteLeave = async (leaveId: string) => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
    
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${leaveId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showSuccessModal('Leave request cancelled successfully!');
        fetchLeaves(); // Refresh data
      } else {
        throw new Error('Failed to cancel leave request');
      }
    } catch (error) {
      console.error('Error cancelling leave:', error);
      showErrorModal('Failed to cancel leave request. Please try again.');
    }
  };

  // Edit leave request
  const handleEditLeave = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setFormData({
      type: leave.type,
      from: leave.from,
      to: leave.to,
      days: leave.days,
      reason: leave.reason
    });
    setIsEditModalOpen(true);
  };

  // View leave request
  const handleViewLeave = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setIsViewModalOpen(true);
  };

  // Update leave request
  const handleUpdateLeave = async () => {
    if (!selectedLeave?._id) return;

    // Validate required fields
    if (!formData.type || !formData.from || !formData.to || !formData.reason) {
      showErrorModal('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${selectedLeave._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 'user123'
        }),
      });

      if (response.ok) {
        showSuccessModal('Leave request updated successfully!');
        setIsEditModalOpen(false);
        setSelectedLeave(null);
        fetchLeaves(); // Refresh data
        resetForm();
      } else {
        throw new Error('Failed to update leave request');
      }
    } catch (error) {
      console.error('Error updating leave:', error);
      showErrorModal('Failed to update leave request. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      from: '',
      to: '',
      days: 0,
      reason: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "btn-accent-success text-xs";
      case "Pending":
        return "btn-secondary text-xs";
      case "Rejected":
        return "btn-accent-danger text-xs";
      default:
        return "btn-neutral text-xs";
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
    return total > 0 ? (used / total) * 100 : 0;
  };

  // Calculate leave statistics based on your formula
  const calculateLeaveStats = () => {
    if (!leaveBalances) return null;

    // Get current leave requests by status
    const pendingDays = leaveRequests.filter(leave => leave.status === 'Pending').reduce((sum, leave) => sum + leave.days, 0);
    const approvedDays = leaveRequests.filter(leave => leave.status === 'Approved').reduce((sum, leave) => sum + leave.days, 0);
    const rejectedDays = leaveRequests.filter(leave => leave.status === 'Rejected').reduce((sum, leave) => sum + leave.days, 0);

    // Total leaves for the year (fixed allocation)
    const totalYearlyLeaves = 25; // This should come from admin settings

    // Available leaves = (Total leaves + rejected leaves) - (Pending leaves + approved leaves)
    const availableLeaves = Math.max(0, (totalYearlyLeaves + rejectedDays) - (pendingDays + approvedDays));

    return {
      total: totalYearlyLeaves,
      pending: pendingDays,
      approved: approvedDays,
      rejected: rejectedDays,
      available: availableLeaves
    };
  };

  // Calculate individual leave type stats
  const calculateLeaveTypeStats = (leaveType: string) => {
    const totalForType = leaveType === 'Casual Leave' ? 12 : 
                        leaveType === 'Sick Leave' ? 7 : 
                        leaveType === 'Annual Leave' ? 6 : 
                        0; // Unpaid has no limit

    const pendingDays = leaveRequests
      .filter(leave => leave.status === 'Pending' && leave.type === leaveType)
      .reduce((sum, leave) => sum + leave.days, 0);
    
    const approvedDays = leaveRequests
      .filter(leave => leave.status === 'Approved' && leave.type === leaveType)
      .reduce((sum, leave) => sum + leave.days, 0);
    
    const rejectedDays = leaveRequests
      .filter(leave => leave.status === 'Rejected' && leave.type === leaveType)
      .reduce((sum, leave) => sum + leave.days, 0);

    // Available = (Total + rejected) - (Pending + approved)
    const available = leaveType === 'Unpaid Leave' ? 999 : // No limit for unpaid
                      Math.max(0, (totalForType + rejectedDays) - (pendingDays + approvedDays));

    // Used = Pending + Approved (both count as "used" from available balance)
    const usedDays = pendingDays + approvedDays;

    return {
      total: totalForType,
      pending: pendingDays,
      approved: approvedDays,
      rejected: rejectedDays,
      available: available,
      used: usedDays
    };
  };

  const calculateDays = (from: string, to: string) => {
    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  useEffect(() => {
    if (formData.from && formData.to) {
      const days = calculateDays(formData.from, formData.to);
      setFormData(prev => ({ ...prev, days }));
    }
  }, [formData.from, formData.to]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Success modal helper
  const showSuccessModal = (message: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Success',
      message,
      type: 'blue',
      confirmText: 'OK',
      onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false }))
    });
  };

  // Error modal helper
  const showErrorModal = (message: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Error',
      message,
      type: 'red',
      confirmText: 'OK',
      onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false }))
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.type || !formData.from || !formData.to || !formData.reason) {
      showErrorModal('Please fill in all required fields.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/leaves/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 'user123' // Replace with actual user ID from auth
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Leave request submitted:', result);
        setIsRequestModalOpen(false);
        resetForm();
        showSuccessModal('Leave request submitted successfully!');
        fetchLeaves(); // Refresh data
      } else {
        throw new Error('Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      showErrorModal('Failed to submit leave request. Please try again.');
    }
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
            onClick={() => setIsRequestModalOpen(true)}
          />
        </div>

        {/* Leave Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4" style={{borderLeftColor: '#639CCE'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary">Available Leaves</p>
                <p className="card-number mt-1">
                  {(() => {
                    const stats = calculateLeaveStats();
                    return stats ? stats.available : '...';
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#639CCE', color: 'white'}}>
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4" style={{borderLeftColor: '#E4864C'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary">Pending Leaves</p>
                <p className="card-number mt-1">
                  {(() => {
                    const stats = calculateLeaveStats();
                    return stats ? stats.pending : '...';
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#E4864C', color: 'white'}}>
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4" style={{borderLeftColor: '#4C9E6A'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary">Approved Leaves</p>
                <p className="card-number mt-1">
                  {(() => {
                    const stats = calculateLeaveStats();
                    return stats ? stats.approved : '...';
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#4C9E6A', color: 'white'}}>
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4" style={{borderLeftColor: '#B95050'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary">Rejected Leaves</p>
                <p className="card-number mt-1">
                  {(() => {
                    const stats = calculateLeaveStats();
                    return stats ? stats.rejected : '...';
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#B95050', color: 'white'}}>
                <XCircle className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4" style={{borderLeftColor: '#365A79'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Leaves</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {(() => {
                    const stats = calculateLeaveStats();
                    return stats ? stats.total : 25;
                  })()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#365A79', color: 'white'}}>
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Leave Balance Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="section-title">Leave Balance</h3>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500">Loading leave balances...</div>
            </div>
          ) : leaveBalances ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const stats = calculateLeaveTypeStats('Casual Leave');
                  return (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="card-title">Casual Leave</span>
                        <span className="text-muted">Used: {stats.used}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(stats.used, stats.total)}%`, backgroundColor: '#639CCE' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Available: {stats.available}</span>
                        <span>Total: {stats.total}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const stats = calculateLeaveTypeStats('Sick Leave');
                  return (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="card-title">Sick Leave</span>
                        <span className="text-muted">Used: {stats.used}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(stats.used, stats.total)}%`, backgroundColor: '#4C9E6A' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Available: {stats.available}</span>
                        <span>Total: {stats.total}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const stats = calculateLeaveTypeStats('Annual Leave');
                  return (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="card-title">Annual Leave</span>
                        <span className="text-muted">Used: {stats.used}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(stats.used, stats.total)}%`, backgroundColor: '#365A79' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Available: {stats.available}</span>
                        <span>Total: {stats.total}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                {(() => {
                  const stats = calculateLeaveTypeStats('Unpaid Leave');
                  return (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="card-title">Unpaid Leave</span>
                        <span className="text-muted">Used: {stats.used}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: stats.used > 0 ? `${Math.min(50, (stats.used / Math.max(stats.used, 10)) * 100)}%` : '0%', 
                            backgroundColor: '#6B7280' 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>No Limit</span>
                        <span>Used: {stats.used}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">No leave balance data available</div>
          )}
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="section-title mb-4">Recent Leave Requests</h3>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500">Loading leave requests...</div>
            </div>
          ) : leaveRequests.length > 0 ? (
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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaveRequests.map((leave, index) => (
                    <tr key={leave._id || index} className="hover:bg-gray-50">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {/* View button - always available */}
                          <button
                            onClick={() => handleViewLeave(leave)}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {/* Edit/Delete buttons - only for pending leaves */}
                          {leave.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleEditLeave(leave)}
                                className="text-green-600 hover:text-green-800"
                                title="Edit Request"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (leave._id) {
                                    console.log('Delete clicked for:', leave._id);
                                    handleDeleteLeave(leave._id);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800"
                                title="Cancel Request"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No leave requests found</p>
              <p className="text-sm">Click "Request Leave" to submit your first leave request</p>
            </div>
          )}
        </div>
      </div>

      {/* Request Leave Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          resetForm();
        }}
        title="Request Leave"
        headerColor="blue"
        icon={<Plus className="h-5 w-5" />}
        footer={
          <div className="flex gap-3">
            <Button
              label="Cancel"
              variant="btn-neutral"
              onClick={() => {
                setIsRequestModalOpen(false);
                resetForm();
              }}
              type="button"
            />
            <Button
              label="Submit Request"
              variant="btn-primary"
              onClick={handleSubmit}
              type="button"
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select leave type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Days
            </label>
            <input
              type="number"
              value={formData.days}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for leave..."
            />
          </div>
        </div>
      </Modal>

      {/* Edit Leave Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLeave(null);
          resetForm();
        }}
        title="Edit Leave Request"
        headerColor="orange"
        icon={<Edit className="h-5 w-5" />}
        footer={
          <div className="flex gap-3">
            <Button
              label="Cancel"
              variant="btn-neutral"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedLeave(null);
                resetForm();
              }}
              type="button"
            />
            <Button
              label="Update Request"
              variant="btn-secondary"
              onClick={handleUpdateLeave}
              type="button"
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select leave type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Days
            </label>
            <input
              type="number"
              value={formData.days}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for leave..."
            />
          </div>
        </div>
      </Modal>

      {/* View Leave Modal */}
      <Modal
        isOpen={isViewModalOpen && selectedLeave !== null}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedLeave(null);
        }}
        title="Leave Request Details"
        headerColor="blue"
        icon={<Eye className="h-5 w-5" />}
        footer={
          <div className="flex gap-3">
            <Button
              label="Close"
              variant="btn-neutral"
              onClick={() => {
                setIsViewModalOpen(false);
                setSelectedLeave(null);
              }}
              type="button"
            />
          </div>
        }
      >
        {selectedLeave && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <p className="text-gray-900 font-semibold">{selectedLeave.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLeave.status)}`}>
                  {getStatusIcon(selectedLeave.status)}
                  {selectedLeave.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <p className="text-gray-900">{selectedLeave.from}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <p className="text-gray-900">{selectedLeave.to}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
                <p className="text-gray-900 font-semibold">{selectedLeave.days} days</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedLeave.reason}</p>
            </div>
            
            {selectedLeave.createdAt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submitted On</label>
                <p className="text-gray-900">{new Date(selectedLeave.createdAt).toLocaleDateString()}</p>
              </div>
            )}

            {selectedLeave.status === 'Pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> This leave request is pending approval. You can edit or cancel it while it's pending.
                </p>
              </div>
            )}

            {selectedLeave.status === 'Approved' && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800 text-sm">
                  <strong>Approved:</strong> This leave has been approved and cannot be modified.
                </p>
              </div>
            )}

            {selectedLeave.status === 'Rejected' && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-800 text-sm">
                  <strong>Rejected:</strong> This leave request has been rejected.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        title={confirmModal.title}
        headerColor={confirmModal.type}
        footer={
          <div className="flex gap-3">
            <Button
              label="Cancel"
              variant="btn-neutral"
              onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
              type="button"
            />
            <Button
              label={confirmModal.confirmText}
              variant={confirmModal.type === 'red' ? 'btn-accent-danger' : 'btn-primary'}
              onClick={confirmModal.onConfirm}
              type="button"
            />
          </div>
        }
      >
        <p className="text-gray-700">{confirmModal.message}</p>
      </Modal>
    </div>
  );
};

export default Leaves;
