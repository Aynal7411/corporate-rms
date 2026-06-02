import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { getActiveJobs } from '../../services/publicApi.js';
import Button from '../../components/ui/Button.jsx';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container-page py-12">
      <h1 className="text-4xl font-bold text-ink">Job Circulars</h1>
      <div className="mt-8 grid gap-4">
        {loading && <p className="rounded bg-white p-6 text-slate-600">Loading jobs...</p>}
        {!loading && jobs.length === 0 && <p className="rounded bg-white p-6 text-slate-600">No active jobs found.</p>}
        {jobs.map((job) => (
          <article key={job._id} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">{job.title}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <FiMapPin /> {job.location || 'Location to be announced'}
                </p>
              </div>
              <Button>Apply Now</Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
