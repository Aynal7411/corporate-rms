import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiDelete, FiEdit3, FiPlus, FiSave, FiUpload } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import { createNotice, deleteNotice, getNotices, updateNotice } from '../../services/noticeApi.js';

const blankNotice = {
  title: '',
  body: '',
  attachmentUrl: '',
  publishDate: '',
  status: 'draft'
};

export default function NoticeManagement() {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const { register, handleSubmit, reset } = useForm({ defaultValues: blankNotice });

  const loadNotices = () => {
    getNotices()
      .then(setNotices)
      .catch(() => toast.error('Could not load notices'));
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const startCreate = () => {
    setEditingNotice(null);
    reset(blankNotice);
  };

  const startEdit = (notice) => {
    setEditingNotice(notice);
    reset({
      title: notice.title,
      body: notice.body,
      attachmentUrl: notice.attachmentUrl || '',
      publishDate: notice.publishDate ? new Date(notice.publishDate).toISOString().slice(0, 10) : '',
      status: notice.status || 'draft'
    });
  };

  const onSubmit = async (values) => {
    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id, values);
        toast.success('Notice updated');
      } else {
        await createNotice(values);
        toast.success('Notice created');
      }
      startCreate();
      loadNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save notice');
    }
  };

  const onDelete = async (notice) => {
    if (!window.confirm('Delete this notice?')) return;

    try {
      await deleteNotice(notice._id);
      toast.success('Notice deleted');
      if (editingNotice?._id === notice._id) startCreate();
      loadNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete notice');
    }
  };

  return (
    <main className="container-page py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Notice Management</h1>
          <p className="mt-1 text-sm text-slate-600">Create, edit, publish, and remove notices for the public site.</p>
        </div>
        <Button onClick={startCreate}>
          <FiPlus /> New Notice
        </Button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[480px_1fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">{editingNotice ? 'Edit Notice' : 'Create Notice'}</h2>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium text-slate-700">
              Title
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" required {...register('title')} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Body
              <textarea className="mt-2 min-h-28 w-full rounded border border-slate-300 px-3 py-2" required {...register('body')} />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Attachment URL
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('attachmentUrl')} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Publish Date
                <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="date" {...register('publishDate')} />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Status
                <select className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('status')}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>
            <Button>
              <FiSave /> {editingNotice ? 'Save Notice' : 'Create Notice'}
            </Button>
          </div>
        </form>

        <section className="overflow-hidden rounded border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-ink">All Notices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-surface text-slate-600">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Publish Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice._id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-ink">{notice.title}</td>
                    <td className="px-5 py-4">{notice.publishDate ? new Date(notice.publishDate).toLocaleDateString() : '-'}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-1 text-xs font-bold ${notice.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => startEdit(notice)} className="grid h-9 w-9 place-items-center rounded border border-slate-300 text-slate-700">
                          <FiEdit3 />
                        </button>
                        <button type="button" onClick={() => onDelete(notice)} className="grid h-9 w-9 place-items-center rounded border border-red-200 text-red-600">
                          <FiDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {notices.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-slate-500" colSpan="4">
                      No notices found.
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
