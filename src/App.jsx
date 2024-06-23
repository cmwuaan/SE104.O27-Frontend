import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/management/Admin';
import Staff from './pages/management/Staff';
import MainLayout from './components/MainLayout/MainLayout';
import Tablelayout from './components/TableLayout/TableLayout.jsx';
import { UserProvider } from './context/userContext';
import DashboardPage from './pages/Dashboard';
import CustomerPage from './pages/management/Customer';
import CustomerDetailPage from './pages/management/Customer/CustomerDetailPage.jsx';
import DeviceDetailPage from './pages/management/Device/DeviceDetailPage.jsx';
import PostPage from './pages/management/Post/PostPage.jsx';
import HomePage from './pages/management/Home/HomePage.jsx';
import FeedbackPage from './pages/management/Feedback/FeedbackPage.jsx';
import ReportPage from './pages/management/Report/ReportPage.jsx';
import SchedulePage from './pages/management/Schedule/SchedulePage.jsx';
import VehiclePage from './pages/management/Vehicle/VehiclePage.jsx';
import PostDetailPage from './pages/management/Post/PostDetailPage.jsx';
import HomeDetailPage from './pages/management/Home/HomeDetailPage.jsx';
import VehicleDetailPage from './pages/management/Vehicle/VehicleDetailPage.jsx';
import LocationDetailPage from './pages/management/Location/LocationDetailPage.jsx';
import LocationPage from './pages/management/Location/LocationPage.jsx';
import ScheduleDetailPage from './pages/management/Schedule/ScheduleDetailPage.jsx';
import FeedbackDetailPage from './pages/management/Feedback/FeedbackDetailPage.jsx';
import ReportDetailPage from './pages/management/Report/ReportDetailPage.jsx';
import DevicePage from './pages/management/Device/DevicePage.jsx';
const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/user" replace />} />
              {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
              <Route element={<Tablelayout />}>
                <Route path="admin" element={<Admin />} />
                <Route path="staff" element={<Staff />} />
                <Route path="user" element={<CustomerPage />} />
                <Route path="user/create" element={<CustomerDetailPage action="create" />} />
                <Route path="user/:id/edit" element={<CustomerDetailPage action="edit" />} />
                <Route path="post" element={<PostPage />} />
                <Route path="post/create" element={<PostDetailPage action="create" />} />
                <Route path="post/:id/edit" element={<PostDetailPage action="edit" />} />
                <Route path="device" element={<DevicePage />} />
                <Route path="device/create" element={<DeviceDetailPage action="create" />} />
                <Route path="device/:id/edit" element={<DeviceDetailPage action="edit" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="home/create" element={<HomeDetailPage action="create" />} />
                <Route path="home/:id/edit" element={<HomeDetailPage action="edit" />} />
                <Route path="vehicle" element={<VehiclePage />} />
                <Route path="vehicle/create" element={<VehicleDetailPage action="create" />} />
                <Route path="vehicle/:id/edit" element={<VehicleDetailPage action="edit" />} />
                {/* <Route path="location" element={<LocationPage />} />
                <Route path="location/create" element={<LocationDetailPage action="create" />} />
                <Route path="location/:id/edit" element={<LocationDetailPage action="edit" />} /> */}
                {/* <Route path="/schedule" element={<SchedulePage />} />
                <Route path="schedule/create" element={<ScheduleDetailPage action="create" />} />
                <Route path="schedule/:id/edit" element={<ScheduleDetailPage action="edit" />} /> */}
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="feedback/create" element={<FeedbackDetailPage action="create" />} />
                <Route path="feedback/:id/edit" element={<FeedbackDetailPage action="edit" />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="report/create" element={<ReportDetailPage action="create" />} />
                <Route path="report/:id/edit" element={<ReportDetailPage action="edit" />} />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </main>
  );
};

export default App;
