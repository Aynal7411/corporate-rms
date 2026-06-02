import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import DashboardRedirect from './routes/DashboardRedirect.jsx';
import Home from './pages/public/Home.jsx';
import StaticPage from './pages/public/StaticPage.jsx';
import Jobs from './pages/public/Jobs.jsx';
import Officers from './pages/public/Officers.jsx';
import OfficerProfile from './pages/public/OfficerProfile.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import CandidateDashboard from './pages/candidate/CandidateDashboard.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CompanySettings from './pages/admin/CompanySettings.jsx';
import ContactManagement from './pages/admin/ContactManagement.jsx';
import JobManagement from './pages/admin/JobManagement.jsx';
import NoticeManagement from './pages/admin/NoticeManagement.jsx';
import OfficerManagement from './pages/admin/OfficerManagement.jsx';

const publicPages = [
  ['about', 'About Us'],
  ['mission-vision', 'Mission & Vision'],
  ['chairman-message', 'Chairman Message'],
  ['management-team', 'Management Team'],
  ['news', 'News & Events'],
  ['notices', 'Notice Board'],
  ['gallery', 'Gallery'],
  ['privacy-policy', 'Privacy Policy'],
  ['terms', 'Terms & Conditions']
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="officers" element={<Officers />} />
          <Route path="officers/:id" element={<OfficerProfile />} />
          <Route path="contact" element={<ContactPage />} />
          {publicPages.map(([path, title]) => (
            <Route key={path} path={path} element={<StaticPage title={title} />} />
          ))}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardRedirect />} />
          <Route
            path="candidate"
            element={
              <ProtectedRoute roles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/officers"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <OfficerManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/jobs"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <JobManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/company-settings"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <CompanySettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/contact-messages"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <ContactManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/notices"
            element={
              <ProtectedRoute roles={['admin', 'super-admin']}>
                <NoticeManagement />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
