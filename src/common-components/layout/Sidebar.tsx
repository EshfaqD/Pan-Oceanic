import React from 'react';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-blue-100 flex flex-col p-4">
    <div className="font-bold text-xl mb-8">Employee Portal</div>
    <nav className="flex flex-col gap-4">
      <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
      <a href="/attendance" className="hover:text-blue-600">Attendance</a>
      <a href="/payroll" className="hover:text-blue-600">Payroll</a>
      <a href="/leaves" className="hover:text-blue-600">Leaves</a>
      <a href="/tasks" className="hover:text-blue-600">Tasks</a>
      <a href="/updates" className="hover:text-blue-600">Updates</a>
      <a href="/settings" className="hover:text-blue-600">Settings</a>
    </nav>
  </aside>
);

export default Sidebar;
