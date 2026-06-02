import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi';
import { getOfficer } from '../../services/officerApi.js';

export default function OfficerProfile() {
  const { id } = useParams();
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    getOfficer(id).then(setOfficer).catch(() => setOfficer(null));
  }, [id]);

  if (!officer) {
    return (
      <main className="container-page py-12">
        <p className="rounded bg-white p-6 text-slate-600">Officer profile not found.</p>
      </main>
    );
  }

  return (
    <main className="container-page py-12">
      <Link to="/officers" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
        <FiArrowLeft /> Back to officers
      </Link>
      <section className="mt-6 grid gap-8 rounded border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-[260px_1fr]">
        <div className="overflow-hidden rounded bg-surface">
          {officer.photo ? <img src={officer.photo} alt={officer.name} className="aspect-square w-full object-cover" /> : <div className="aspect-square" />}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand">{officer.department}</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">{officer.name}</h1>
          <p className="mt-2 text-xl font-semibold text-slate-700">{officer.designation}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
            {officer.email && <span className="inline-flex items-center gap-2"><FiMail /> {officer.email}</span>}
            {(officer.mobile || officer.phone) && <span className="inline-flex items-center gap-2"><FiPhone /> {officer.mobile || officer.phone}</span>}
          </div>
          <p className="mt-8 whitespace-pre-line leading-8 text-slate-600">{officer.biography || 'Biography will be updated soon.'}</p>
        </div>
      </section>
    </main>
  );
}
