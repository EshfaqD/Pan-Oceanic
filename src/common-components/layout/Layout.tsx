import React, { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Dummy auth check (replace with real auth logic)
const isLoggedIn = () => !!localStorage.getItem('user');
const getUser = () => JSON.parse(localStorage.getItem('user') || '{"name":"John Doe","role":"Software Engineer"}');

const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const user = getUser();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
