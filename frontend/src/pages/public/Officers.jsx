import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone } from 'react-icons/fi';
import { getOfficers } from '../../services/officerApi.js';

export default function Officers() {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfficers({ status: 'Active' })
      .then(setOfficers)
      .catch(() => setOfficers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-bold text-ink">Officers Directory</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="rounded bg-white p-6 text-slate-600">Loading officers...</p>}
        {!loading && officers.length === 0 && <p className="rounded bg-white p-6 text-slate-600">No officers found.</p>}
        {officers.map((officer) => (
          <Link key={officer._id} to={`/officers/${officer._id}`} className="rounded border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1">
            <div className="flex gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-surface">
                {officer.photo && <img src={officer.photo} alt="" className="h-full w-full object-cover" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">{officer.name}</h2>
                <p className="mt-1 text-sm font-semibold text-brand">{officer.designation}</p>
                <p className="mt-1 text-sm text-slate-500">{officer.department}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {officer.email && <p className="flex items-center gap-2"><FiMail /> {officer.email}</p>}
              {(officer.mobile || officer.phone) && <p className="flex items-center gap-2"><FiPhone /> {officer.mobile || officer.phone}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
