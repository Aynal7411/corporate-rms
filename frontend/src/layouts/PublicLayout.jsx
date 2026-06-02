import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiBriefcase, FiLogIn } from 'react-icons/fi';
import { useCompanyProfileStore } from '../store/companyProfileStore.js';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/officers', 'Officers'],
  ['/news', 'News'],
  ['/notices', 'Notices'],
  ['/jobs', 'Jobs'],
  ['/contact', 'Contact']
];

export default function PublicLayout() {
  const { profile, fetchProfile } = useCompanyProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="container-page flex min-h-16 items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded bg-brand text-white">
              {profile.logoUrl ? <img src={profile.logoUrl} alt="" className="h-full w-full object-contain p-1" /> : <FiBriefcase />}
            </span>
            {profile.companyName}
          </NavLink>
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
            {links.map(([href, label]) => (
              <NavLink key={href} to={href} className={({ isActive }) => (isActive ? 'text-brand' : 'hover:text-brand')}>
                {label}
              </NavLink>
            ))}
          </div>
          <NavLink to="/login" className="inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-semibold text-white">
            <FiLogIn /> Login
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="mt-12 border-t border-slate-200 bg-white py-8">
        <div className="container-page flex flex-col gap-2 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>{profile.companyName}. Company profile and recruitment operations in one platform.</p>
          <p>{[profile.phone, profile.email].filter(Boolean).join(' | ') || 'Privacy, terms, and support channels are managed by administration.'}</p>
        </div>
      </footer>
    </div>
  );
}
