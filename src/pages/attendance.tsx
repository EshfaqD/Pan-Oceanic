import React, { useState } from 'react';
import Layout from '../common-components/layout/Layout';

type WeeklyHour = { day: string; hours: number };
type Activity = { date: string; checkIn: string; checkOut: string; workHours: string; location: string; status: string };

const Attendance = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [weeklyHours] = useState<WeeklyHour[]>([
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 8.2 },
    { day: 'Wed', hours: 7 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 7.2 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ]);
  const [recentActivity] = useState<Activity[]>([
    { date: '2023-09-14', checkIn: '09:02:45', checkOut: '17:30:12', workHours: '8h 27m', location: 'Office', status: 'Completed' },
    { date: '2023-09-13', checkIn: '09:15:33', checkOut: '18:05:47', workHours: '8h 50m', location: 'Remote', status: 'Completed' },
    { date: '2023-09-12', checkIn: '09:00:12', checkOut: '17:45:23', workHours: '8h 45m', location: 'Office', status: 'Completed' },
  ]);

  const handleCheckIn = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/attendance/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setCheckedIn(true);
        setCheckInTime(data.time);
      }
    } catch (err) {
      alert('Check-in failed');
    }
  };
  const handleCheckOut = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/attendance/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setCheckedIn(false);
        setCheckOutTime(data.time);
      }
    } catch (err) {
      alert('Check-out failed');
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Attendance Tracking</h2>
        <div className="flex gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow flex-1">
            <div className="mb-2">Check In Time: <span className="font-bold">{checkInTime || '--:--:--'}</span></div>
            <div className="mb-2">Check Out Time: <span className="font-bold">{checkOutTime || '--:--:--'}</span></div>
            <div className="flex gap-4 mt-4">
              <button onClick={handleCheckIn} disabled={checkedIn} className="bg-green-600 text-white px-4 py-2 rounded">Check In</button>
              <button onClick={handleCheckOut} disabled={!checkedIn} className="bg-red-600 text-white px-4 py-2 rounded">Check Out</button>
            </div>
            <div className="mt-4 bg-yellow-50 p-2 rounded text-sm">Remote Work Verification: Your location has been verified for remote work.</div>
          </div>
          <div className="bg-white p-4 rounded shadow flex-1">
            <div className="font-bold mb-2">Weekly Hours</div>
            <div>
              {weeklyHours.map((wh, idx) => (
                <div key={idx} className="flex items-center mb-1">
                  <span className="w-10">{wh.day}</span>
                  <div className="flex-1 h-3 bg-blue-100 rounded mx-2">
                    <div style={{ width: `${wh.hours * 12}%` }} className="h-3 bg-blue-500 rounded"></div>
                  </div>
                  <span className="w-10 text-right">{wh.hours}h</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs">Total Hours: 38.7h<br />Average Daily: 7.7h</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="font-bold mb-2">Recent Activity</div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((act, idx) => (
                <tr key={idx} className="border-b">
                  <td>{act.date}</td>
                  <td>{act.checkIn}</td>
                  <td>{act.checkOut}</td>
                  <td>{act.workHours}</td>
                  <td>{act.location}</td>
                  <td><span className="text-green-600">{act.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
