import { useState } from 'react';
import { Header } from '../common-components/header';
import { Sidebar } from '../common-components/sidebar';
import Button from '../common-components/button';

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Attendance Tracking" showSearchBar={false} searchQuery="" setSearchQuery={() => {}} />
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="card-title">Wednesday, August 20, 2025</span>
                  <span className="text-primary">11:22:12 AM</span>
                  <div>
                    <Button label="Office" variant="btn-neutral" className="mr-2" />
                    <Button label="Remote" variant="btn-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 rounded p-4 text-center">
                    <div className="mb-2 card-title">Check In Time</div>
                    <div className="card-number mb-2">{checkInTime || '--:--:--'}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-4 text-center">
                    <div className="mb-2 card-title">Check Out Time</div>
                    <div className="card-number mb-2">{checkOutTime || '--:--:--'}</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mb-4">
                  <Button onClick={handleCheckIn} disabled={checkedIn} label="Check In" variant="btn-accent-success" className="px-6 py-2 text-lg" />
                  <Button onClick={handleCheckOut} disabled={!checkedIn} label="Check Out" variant="btn-accent-danger" className="px-6 py-2 text-lg" />
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-2">
                  <span className="card-title">Remote Work Verification</span><br />
                  <span className="text-primary">Your location has been verified for remote work. Please ensure you're available during working hours.</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="section-title mb-4">Recent Activity</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="text-secondary py-2">Date</th>
                      <th className="text-secondary py-2">Check In</th>
                      <th className="text-secondary py-2">Check Out</th>
                      <th className="text-secondary py-2">Work Hours</th>
                      <th className="text-secondary py-2">Location</th>
                      <th className="text-secondary py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((act, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="text-primary py-2">{act.date}</td>
                        <td className="text-primary py-2">{act.checkIn}</td>
                        <td className="text-primary py-2">{act.checkOut}</td>
                        <td className="text-primary py-2">{act.workHours}</td>
                        <td className="text-primary py-2">{act.location}</td>
                        <td className="py-2"><span className="text-green-600 text-primary">{act.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-4 text-lg">Weekly Hours</h3>
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
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-4 text-lg">Today Activity <span className="text-xs text-blue-500 ml-2 cursor-pointer">View All</span></h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2"><span className="text-red-600 font-bold">●</span> Checked Out <span className="text-xs text-gray-500 ml-2">10:15 PM</span></div>
                  <div className="flex items-center gap-2"><span className="text-green-600 font-bold">●</span> Checked In <span className="text-xs text-gray-500 ml-2">2:15 PM</span></div>
                  <div className="flex items-center gap-2"><span className="text-red-600 font-bold">●</span> Checked Out <span className="text-xs text-gray-500 ml-2">10:00 PM</span></div>
                  <div className="flex items-center gap-2"><span className="text-green-600 font-bold">●</span> Checked In <span className="text-xs text-gray-500 ml-2">10:00 AM</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
