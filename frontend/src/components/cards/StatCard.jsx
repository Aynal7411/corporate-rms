export default function StatCard({ label, value }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
