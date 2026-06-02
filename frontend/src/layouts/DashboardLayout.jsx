import { NavLink, Outlet } from 'react-router-dom';
import { FiBell, FiBriefcase, FiGrid, FiHome, FiMail, FiSettings, FiUsers, FiUser } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore.js';

export default function DashboardLayout() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 md:block">
        <NavLink to="/" className="mb-8 flex items-center gap-2 font-bold text-ink">
          <FiHome /> Corporate RMS
        </NavLink>
        <nav className="space-y-2 text-sm font-medium text-slate-700">
          {user?.role === 'candidate' ? (
            <NavLink to="/candidate" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
              <FiUser /> Candidate
            </NavLink>
          ) : (
            <>
              <NavLink to="/admin" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
                <FiGrid /> Admin
              </NavLink>
              <NavLink to="/admin/jobs" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
                <FiBriefcase /> Jobs
              </NavLink>
              <NavLink to="/admin/contact-messages" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
                <FiMail /> Messages
              </NavLink>
              <NavLink to="/admin/company-settings" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
                <FiSettings /> Company Settings
              </NavLink>
              <NavLink to="/admin/officers" className="flex items-center gap-2 rounded px-3 py-2 hover:bg-slate-100">
                <FiUsers /> Officers
              </NavLink>
              
            </>
          )}
        </nav>
      </aside>
      <main className="md:pl-64">
        <Outlet />
      </main>
    </div>
  );
}
