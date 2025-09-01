import React, { useState } from 'react';
import Layout from '../common-components/layout/Layout';

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    { type: 'Casual Leave', from: '2023-03-15', to: '2023-03-16', days: 2, reason: 'Family event', status: 'Approved' },
    { type: 'Sick Leave', from: '2023-04-10', to: '2023-04-10', days: 1, reason: 'Not feeling well', status: 'Approved' },
    { type: 'Annual Leave', from: '2023-05-20', to: '2023-05-24', days: 5, reason: 'Vacation', status: 'Pending' },
    { type: 'Casual Leave', from: '2023-06-05', to: '2023-06-05', days: 1, reason: 'Personal work', status: 'Rejected' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: '', from: '', to: '', days: 1, reason: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/leaves/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setLeaveRequests([...leaveRequests, { ...form, status: 'Pending' }]);
        setShowModal(false);
        setForm({ type: '', from: '', to: '', days: 1, reason: '' });
      }
    } catch (err) {
      alert('Request failed');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>+ Request Leave</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white p-6 rounded shadow w-96" onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold mb-4">Request Leave</h3>
            <div className="mb-2">
              <label className="block mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-2 py-1">
                <option value="">Select Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">From</label>
              <input type="date" name="from" value={form.from} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">To</label>
              <input type="date" name="to" value={form.to} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Days</label>
              <input type="number" name="days" value={form.days} onChange={handleChange} className="w-full border rounded px-2 py-1" min={1} required />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Reason</label>
              <input type="text" name="reason" value={form.reason} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="font-bold">Available Leaves</div>
          <div className="text-2xl">18</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="font-bold">Pending Leaves</div>
          <div className="text-2xl">2</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="font-bold">Approved Leaves</div>
          <div className="text-2xl">5</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="font-bold">Rejected Leaves</div>
          <div className="text-2xl">1</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <div className="font-bold">Casual Leave</div>
          <div>Used: 4</div>
          <div>Balance: 8</div>
          <div className="text-xs text-gray-500">Total: 12</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="font-bold">Sick Leave</div>
          <div>Used: 2</div>
          <div>Balance: 8</div>
          <div className="text-xs text-gray-500">Total: 10</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="font-bold">Annual Leave</div>
          <div>Used: 5</div>
          <div>Balance: 10</div>
          <div className="text-xs text-gray-500">Total: 15</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="font-bold">Unpaid Leave</div>
          <div>Used: 0</div>
          <div>Balance: 0</div>
          <div className="text-xs text-gray-500">Total: 0</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <div className="font-bold mb-2">Leave Requests</div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req, idx) => (
              <tr key={idx} className="border-b">
                <td>{req.type}</td>
                <td>{req.from}</td>
                <td>{req.to}</td>
                <td>{req.days}</td>
                <td>{req.reason}</td>
                <td>
                  <span className={
                    req.status === 'Approved' ? 'text-green-600' : req.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                  }>{req.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Leaves;
