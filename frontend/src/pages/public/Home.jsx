import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import StatCard from '../../components/cards/StatCard.jsx';

const stats = [
  ['Active Jobs', '12'],
  ['Applications', '4.8k'],
  ['Officers', '86'],
  ['Departments', '14']
];

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="container-page grid min-h-[560px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Company Profile & Recruitment</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              Corporate RMS
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Publish company information, manage officers, run job circulars, collect applications, verify payments,
              and issue admit cards from one secure platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/jobs">
                View Jobs <FiArrowRight />
              </Button>
              <Button as={Link} to="/register" className="bg-accent text-ink hover:bg-ink hover:text-white">
                Candidate Registration
              </Button>
            </div>
          </motion.div>
          <div className="rounded border border-slate-200 bg-surface p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              {['Officer Directory', 'Job Circulars', 'Online Payment', 'Admit Card PDF'].map((item) => (
                <div key={item} className="flex min-h-28 items-start gap-3 rounded bg-white p-4">
                  <FiCheckCircle className="mt-1 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold text-ink">{item}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Ready for admin-managed workflows.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value]) => (
            <StatCard key={label} label={label} value={value} />
          ))}
        </div>
      </section>

      <section className="container-page grid gap-6 py-10 lg:grid-cols-3">
        {['Chairman Message', 'Latest Notices', 'Active Job Circulars'].map((title) => (
          <article key={title} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">
              This section is connected to CMS-managed data in the next implementation pass.
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
