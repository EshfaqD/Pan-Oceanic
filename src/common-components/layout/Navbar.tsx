import React from 'react';

const Navbar = ({ user }: { user: { name: string; role: string } }) => (
  <header className="w-full flex items-center justify-between bg-white shadow px-6 py-3">
    <div className="text-lg font-semibold">Leave Management</div>
    <div className="flex items-center gap-4">
      <span>{user.name}</span>
      <span className="text-xs text-gray-500">{user.role}</span>
      <img src="/public/logo.png" alt="User" className="w-8 h-8 rounded-full" />
    </div>
  </header>
);

export default Navbar;
