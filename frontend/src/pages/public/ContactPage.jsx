import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button.jsx';
import { createContactMessage } from '../../services/contactApi.js';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createContactMessage(form);
      toast.success('Your message was sent successfully.');
      setForm(initialForm);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not send your message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container-page py-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded border border-slate-200 bg-white p-8 shadow-soft">
          <h1 className="text-4xl font-bold text-ink">Contact Us</h1>
          <p className="mt-3 text-slate-600">Send us your message and our support team will respond as soon as possible.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Subject
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-2 w-full rounded border border-slate-300 px-3 py-2"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-2 min-h-[160px] w-full rounded border border-slate-300 px-3 py-2"
              />
            </label>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </section>

        <aside className="space-y-6 rounded border border-slate-200 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Need help?</h2>
            <p className="mt-2 text-slate-600">Reach out with questions about job circulars, applications, payments, or admit cards.</p>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">Address</p>
              <p>Head Office, Dhaka, Bangladesh</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Phone</p>
              <p>+880 1234 567890</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p>support@corporaterms.com</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
