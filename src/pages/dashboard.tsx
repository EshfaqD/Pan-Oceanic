import { Header } from '../common-components/header';
import { Sidebar } from '../common-components/sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Dashboard" showSearchBar={false} searchQuery="" setSearchQuery={() => {}} />
        <div className="p-8">
          <h2 className="page-title mb-6 mt-8">Welcome back, John!</h2>
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="section-title">Today's Status</div>
              <div className="text-green-600 card-number">Checked In</div>
              <div className="text-muted">09:15 AM</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="section-title">Leave Balance</div>
              <div className="text-blue-600 card-number">15 days</div>
              <div className="text-muted">5 days used</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="section-title">Notifications</div>
              <div className="text-yellow-600 card-number">2 new</div>
              <div className="text-muted">Last updated 2h ago</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="section-title">Latest Payslip</div>
              <div className="text-purple-600 card-number">September 2023</div>
              <a href="#" className="text-muted text-blue-500">View details</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="section-title mb-2">Upcoming Events</div>
              <div className="mb-2 bg-blue-50 p-2 rounded">
                <div className="text-primary">Team Meeting</div>
                <span className="text-muted">Today, 2:00 PM - 3:00 PM</span>
              </div>
              <div className="mb-2 bg-yellow-50 p-2 rounded">
                <div className="text-primary">Project Deadline</div>
                <span className="text-muted">Tomorrow, 5:00 PM</span>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-primary">Company Townhall</div>
                <span className="text-muted">Friday, 10:00 AM - 11:30 AM</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="section-title mb-2">Recent Updates</div>
              <div className="mb-2">
                <div className="text-primary">New Vacation Policy</div>
                <span className="text-muted">2 days ago</span>
              </div>
              <div className="mb-2">
                <div className="text-primary">IT System Maintenance</div>
                <span className="text-muted">3 days ago</span>
              </div>
              <div>
                <div className="text-primary">Q4 Goals Announcement</div>
                <span className="text-muted">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
