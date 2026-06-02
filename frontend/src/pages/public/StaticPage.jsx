export default function StaticPage({ title }) {
  return (
    <main className="container-page py-12">
      <h1 className="text-3xl font-bold text-ink md:text-5xl">{title}</h1>
      <div className="mt-8 rounded border border-slate-200 bg-white p-6 shadow-soft">
        <p className="leading-8 text-slate-600">
          Content for {title.toLowerCase()} will be managed from the admin dashboard. The layout is ready for rich text,
          media, tables, and public listing views.
        </p>
      </div>
    </main>
  );
}
