import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import { deleteOfficer, getOfficers, saveOfficer } from '../../services/officerApi.js';

const blankOfficer = {
  name: '',
  designation: '',
  department: '',
  biography: '',
  email: '',
  mobile: '',
  status: 'Active'
};

export default function OfficerManagement() {
  const [officers, setOfficers] = useState([]);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: blankOfficer });
  const previewPhoto = useMemo(() => (photo ? URL.createObjectURL(photo) : editingOfficer?.photo), [photo, editingOfficer]);

  const loadOfficers = () => {
    getOfficers().then(setOfficers).catch(() => toast.error('Could not load officers'));
  };

  useEffect(() => {
    loadOfficers();
  }, []);

  const startCreate = () => {
    setEditingOfficer(null);
    setPhoto(null);
    reset(blankOfficer);
  };

  const startEdit = (officer) => {
    setEditingOfficer(officer);
    setPhoto(null);
    reset({
      ...blankOfficer,
      ...officer,
      mobile: officer.mobile || officer.phone || ''
    });
  };

  const onSubmit = async (values) => {
    try {
      await saveOfficer(values, photo, editingOfficer?._id);
      toast.success(editingOfficer ? 'Officer updated' : 'Officer created');
      startCreate();
      loadOfficers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save officer');
    }
  };

  const onDelete = async (officer) => {
    if (!window.confirm(`Delete ${officer.name}?`)) return;

    try {
      await deleteOfficer(officer._id);
      toast.success('Officer deleted');
      loadOfficers();
      if (editingOfficer?._id === officer._id) startCreate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete officer');
    }
  };

  return (
    <main className="container-page py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Officer Management</h1>
          <p className="mt-1 text-sm text-slate-600">Create, update, delete, and publish officer profiles.</p>
        </div>
        <Button onClick={startCreate}>
          <FiPlus /> New Officer
        </Button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">{editingOfficer ? 'Update Officer' : 'Create Officer'}</h2>

          <div className="mt-5 grid gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded border border-slate-200 bg-surface">
                {previewPhoto ? <img src={previewPhoto} alt="" className="h-full w-full object-cover" /> : <FiUpload className="text-2xl text-slate-400" />}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                <FiUpload /> Upload Photo
                <input className="hidden" type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
              </label>
            </div>

            <label className="text-sm font-medium text-slate-700">
              Name
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('name', { required: true })} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Designation
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('designation', { required: true })} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Department
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('department')} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Email
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="email" {...register('email')} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Mobile
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('mobile')} />
              </label>
            </div>
            <label className="text-sm font-medium text-slate-700">
              Status
              <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('status')}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Biography
              <textarea className="mt-2 min-h-28 w-full rounded border border-slate-300 px-3 py-2" {...register('biography')} />
            </label>
            <Button>
              <FiSave /> {editingOfficer ? 'Save Changes' : 'Create Officer'}
            </Button>
          </div>
        </form>

        <section className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-ink">All Officers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-surface text-slate-600">
                <tr>
                  <th className="px-5 py-3">Officer</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Mobile</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {officers.map((officer) => (
                  <tr key={officer._id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 overflow-hidden rounded bg-surface">
                          {officer.photo && <img src={officer.photo} alt="" className="h-full w-full object-cover" />}
                        </div>
                        <div>
                          <Link to={`/officers/${officer._id}`} className="font-semibold text-ink hover:text-brand">
                            {officer.name}
                          </Link>
                          <p className="text-slate-500">{officer.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">{officer.department || '-'}</td>
                    <td className="px-5 py-4">{officer.mobile || officer.phone || '-'}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-1 text-xs font-bold ${officer.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {officer.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => startEdit(officer)} className="grid h-9 w-9 place-items-center rounded border border-slate-300 text-slate-700">
                          <FiEdit2 />
                        </button>
                        <button type="button" onClick={() => onDelete(officer)} className="grid h-9 w-9 place-items-center rounded border border-red-200 text-red-600">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {officers.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-slate-500" colSpan="5">
                      No officers found.
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
