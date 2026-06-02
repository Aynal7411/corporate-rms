import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiEdit2, FiPlus, FiSave, FiSlash, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import { deleteJob, getJobs, saveJob, updateJobStatus } from '../../services/jobApi.js';

const blankJob = {
  title: '',
  vacancy: 1,
  salary: '',
  deadline: '',
  requirements: '',
  responsibilities: '',
  location: '',
  jobType: 'Full Time',
  examFee: 0,
  status: 'draft'
};

export default function JobManagement() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: blankJob });

  const loadJobs = () => {
    getJobs().then(setJobs).catch(() => toast.error('Could not load jobs'));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const startCreate = () => {
    setEditingJob(null);
    reset(blankJob);
  };

  const startEdit = (job) => {
    setEditingJob(job);
    reset({
      title: job.title,
      vacancy: job.vacancy,
      salary: job.salary || '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().slice(0, 10) : '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements || '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : job.responsibilities || '',
      location: job.location || '',
      jobType: job.employmentType || 'Full Time',
      examFee: job.applicationFee ?? 0,
      status: job.status || 'draft'
    });
  };

  const onSubmit = async (values) => {
    try {
      await saveJob(values, editingJob?._id);
      toast.success(editingJob ? 'Job updated' : 'Job created');
      startCreate();
      loadJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save job');
    }
  };

  const onDelete = async (job) => {
    if (!window.confirm(`Delete ${job.title}?`)) return;

    try {
      await deleteJob(job._id);
      toast.success('Job deleted');
      loadJobs();
      if (editingJob?._id === job._id) startCreate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete job');
    }
  };

  const onChangeStatus = async (job, status) => {
    try {
      await updateJobStatus(job._id, status);
      toast.success(`Job ${status === 'published' ? 'published' : status === 'closed' ? 'closed' : status} successfully`);
      loadJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update status');
    }
  };

  return (
    <main className="container-page py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Job Circular Management</h1>
          <p className="mt-1 text-sm text-slate-600">Create, edit, delete, publish, and close job circulars.</p>
        </div>
        <Button onClick={startCreate}>
          <FiPlus /> New Job
        </Button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[480px_1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">{editingJob ? 'Edit Job' : 'Create Job'}</h2>

          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium text-slate-700">
              Job Title
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('title', { required: true })} />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Vacancy
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="number" min="1" {...register('vacancy', { valueAsNumber: true })} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Salary
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('salary')} />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Deadline
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="date" {...register('deadline')} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Job Type
                <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('jobType')}>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                </select>
              </label>
            </div>

            <label className="text-sm font-medium text-slate-700">
              Location
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('location')} />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Exam Fee
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="number" min="0" {...register('examFee', { valueAsNumber: true })} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Status
                <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('status')}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
            </div>

            <label className="text-sm font-medium text-slate-700">
              Requirements
              <textarea className="mt-2 min-h-28 w-full rounded border border-slate-300 px-3 py-2" placeholder="One requirement per line" {...register('requirements')} />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Responsibilities
              <textarea className="mt-2 min-h-28 w-full rounded border border-slate-300 px-3 py-2" placeholder="One responsibility per line" {...register('responsibilities')} />
            </label>

            <Button>
              <FiSave /> {editingJob ? 'Save Job' : 'Create Job'}
            </Button>
          </div>
        </form>

        <section className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-ink">All Job Circulars</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-surface text-slate-600">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Vacancy</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Deadline</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-ink">{job.title}</td>
                    <td className="px-5 py-4">{job.vacancy}</td>
                    <td className="px-5 py-4">{job.employmentType}</td>
                    <td className="px-5 py-4">{job.deadline ? new Date(job.deadline).toLocaleDateString() : '-'}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-1 text-xs font-bold ${job.status === 'published' ? 'bg-emerald-50 text-emerald-700' : job.status === 'closed' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button type="button" onClick={() => startEdit(job)} className="grid h-9 w-9 place-items-center rounded border border-slate-300 text-slate-700">
                          <FiEdit2 />
                        </button>
                        {job.status !== 'published' && (
                          <button type="button" onClick={() => onChangeStatus(job, 'published')} className="grid h-9 w-9 place-items-center rounded border border-emerald-200 text-emerald-600">
                            <FiCheckCircle />
                          </button>
                        )}
                        {job.status !== 'closed' && (
                          <button type="button" onClick={() => onChangeStatus(job, 'closed')} className="grid h-9 w-9 place-items-center rounded border border-rose-200 text-rose-600">
                            <FiSlash />
                          </button>
                        )}
                        <button type="button" onClick={() => onDelete(job)} className="grid h-9 w-9 place-items-center rounded border border-red-200 text-red-600">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-slate-500" colSpan="6">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
