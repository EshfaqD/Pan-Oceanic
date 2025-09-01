import { Header } from '../common-components/header';
import { Sidebar } from '../common-components/sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Dashboard" showSearchBar={false} searchQuery="" setSearchQuery={() => {}} />
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 mt-8">Welcome back, John!</h2>
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="font-bold">Today's Status</div>
              <div className="text-green-600">Checked In</div>
              <div className="text-xs">09:15 AM</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="font-bold">Leave Balance</div>
              <div className="text-blue-600">15 days</div>
              <div className="text-xs">5 days used</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="font-bold">Notifications</div>
              <div className="text-yellow-600">2 new</div>
              <div className="text-xs">Last updated 2h ago</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="font-bold">Latest Payslip</div>
              <div className="text-purple-600">September 2023</div>
              <a href="#" className="text-xs text-blue-500">View details</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold mb-2">Upcoming Events</div>
              <div className="mb-2 bg-blue-50 p-2 rounded">Team Meeting<br /><span className="text-xs">Today, 2:00 PM - 3:00 PM</span></div>
              <div className="mb-2 bg-yellow-50 p-2 rounded">Project Deadline<br /><span className="text-xs">Tomorrow, 5:00 PM</span></div>
              <div className="bg-green-50 p-2 rounded">Company Townhall<br /><span className="text-xs">Friday, 10:00 AM - 11:30 AM</span></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-bold mb-2">Recent Updates</div>
              <div className="mb-2">New Vacation Policy<br /><span className="text-xs text-gray-500">2 days ago</span></div>
              <div className="mb-2">IT System Maintenance<br /><span className="text-xs text-gray-500">3 days ago</span></div>
              <div>Q4 Goals Announcement<br /><span className="text-xs text-gray-500">1 week ago</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
