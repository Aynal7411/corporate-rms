import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiArchive, FiEye, FiMail, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import { deleteContactMessage, getContactMessages, updateContactMessage } from '../../services/contactApi.js';

const statusLabel = {
  New: 'bg-emerald-50 text-emerald-700',
  Read: 'bg-slate-100 text-slate-600',
  Archived: 'bg-slate-200 text-slate-700'
};

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);

  const loadMessages = () => {
    getContactMessages().then(setMessages).catch(() => toast.error('Could not load contact messages'));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markAs = async (message, status) => {
    try {
      await updateContactMessage(message._id, { status });
      toast.success(`Message marked ${status.toLowerCase()}`);
      loadMessages();
      if (activeMessage?._id === message._id) setActiveMessage({ ...message, status });
    } catch (error) {
      toast.error('Could not update status');
    }
  };

  const onDelete = async (message) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await deleteContactMessage(message._id);
      toast.success('Message deleted');
      loadMessages();
      if (activeMessage?._id === message._id) setActiveMessage(null);
    } catch (error) {
      toast.error('Could not delete message');
    }
  };

  return (
    <main className="container-page py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Contact Messages</h1>
          <p className="mt-1 text-sm text-slate-600">Review customer inquiries, mark them read, archive, or remove unwanted entries.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
        <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Messages</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Subject</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id} className="border-t border-slate-100">
                    <td className="px-3 py-4">{message.name}</td>
                    <td className="px-3 py-4">{message.email}</td>
                    <td className="px-3 py-4">{message.subject || '-'}</td>
                    <td className="px-3 py-4">
                      <span className={`rounded px-2 py-1 text-xs font-semibold ${statusLabel[message.status] || 'bg-slate-100 text-slate-600'}`}>
                        {message.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Button type="button" onClick={() => setActiveMessage(message)}>
                          <FiEye /> View
                        </Button>
                        {message.status !== 'Read' && (
                          <Button type="button" onClick={() => markAs(message, 'Read')}>
                            <FiMail /> Mark Read
                          </Button>
                        )}
                        {message.status !== 'Archived' && (
                          <Button type="button" onClick={() => markAs(message, 'Archived')}>
                            <FiArchive /> Archive
                          </Button>
                        )}
                        <Button type="button" onClick={() => onDelete(message)} className="bg-rose-50 text-rose-700 hover:bg-rose-100">
                          <FiTrash2 /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td className="px-3 py-8 text-center text-slate-500" colSpan="5">
                      No contact messages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Message Details</h2>
          {activeMessage ? (
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">From</p>
                <p className="text-lg font-semibold text-ink">{activeMessage.name}</p>
                <p className="text-sm text-slate-600">{activeMessage.email}</p>
                {activeMessage.phone && <p className="text-sm text-slate-600">{activeMessage.phone}</p>}
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">Subject</p>
                <p className="text-base text-slate-900">{activeMessage.subject || 'No subject provided'}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-500">Message</p>
                <p className="whitespace-pre-line text-slate-700">{activeMessage.message}</p>
              </div>
              <div className="text-sm text-slate-500">Received: {new Date(activeMessage.createdAt).toLocaleString()}</div>
            </div>
          ) : (
            <div className="mt-5 rounded border border-dashed border-slate-200 p-6 text-slate-600">
              Select a message to view details here.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
