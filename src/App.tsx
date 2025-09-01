import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Sidebar } from "./common-components/sidebar";
import Dashboard from "./pages/dashboard";
import Attendance from "./pages/attendance";
import Leaves from "./pages/leaves";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Sidebar />
        <div className="pl-64">
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaves" element={<Leaves />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
