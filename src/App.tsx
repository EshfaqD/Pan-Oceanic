import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { Sidebar } from "./common-components/sidebar";
import { Header } from "./common-components/header";

import "./App.css";
import { routes } from "./config/routes";

const DashboardLayout = () => {
  const location = useLocation();

  const currentRoute = routes.find(
    (route) =>
      route.path === location.pathname ||
      (route.index && location.pathname === "/")
  );

  const currentTitle = currentRoute?.title || "HR Payroll System";
  const showSearchBar = currentRoute?.showSearchBar || false;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header title={currentTitle} showSearchBar={showSearchBar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
              index={route.index}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
