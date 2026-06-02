import { useEffect, useState } from 'react';
import StatCard from '../../components/cards/StatCard.jsx';
import { api } from '../../services/api.js';


const fallback = {
  totalCandidates: 0,
  totalApplications: 0,
  totalJobs: 0,
  revenue: 0,
  activeJobs: 0,
  todaysApplications: 0
};

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(fallback);

  useEffect(() => {
    api.get('/dashboard/analytics').then((res) => setAnalytics(res.data)).catch(() => setAnalytics(fallback));
  }, []);

  return (
    <main className="container-page py-8">
      <h1 className="text-3xl font-bold text-ink">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Total Candidates" value={analytics.totalCandidates} />
        <StatCard label="Applications" value={analytics.totalApplications} />
        <StatCard label="Total Jobs" value={analytics.totalJobs} />
        <StatCard label="Revenue" value={`BDT ${analytics.revenue}`} />
        <StatCard label="Active Jobs" value={analytics.activeJobs} />
        <StatCard label="Today's Applications" value={analytics.todaysApplications} />
      </div>

    </main>
  );
}
