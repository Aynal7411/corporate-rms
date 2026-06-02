import StatCard from '../../components/cards/StatCard.jsx';

export default function CandidateDashboard() {
  return (
    <main className="container-page py-8">
      <h1 className="text-3xl font-bold text-ink">Candidate Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Applied Jobs" value="0" />
        <StatCard label="Payments" value="0" />
        <StatCard label="Admit Cards" value="0" />
      </div>
      <section className="mt-6 rounded border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Profile Completion</h2>
        <p className="mt-2 text-slate-600">Add personal information, education, experience, photo, signature, and CV.</p>
      </section>
    </main>
  );
}
