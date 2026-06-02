import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPlus, FiSave, FiTrash2, FiUpload } from 'react-icons/fi';
import Button from '../../components/ui/Button.jsx';
import { updateCompanyProfile } from '../../services/companyProfileApi.js';
import { useCompanyProfileStore } from '../../store/companyProfileStore.js';

const emptySocialLink = { platform: '', url: '' };

export default function CompanySettings() {
  const { profile, fetchProfile, setProfile } = useCompanyProfileStore();
  const { register, handleSubmit, reset } = useForm();
  const [logo, setLogo] = useState(null);
  const [socialLinks, setSocialLinks] = useState([emptySocialLink]);
  const previewLogo = useMemo(() => (logo ? URL.createObjectURL(logo) : profile.logoUrl), [logo, profile.logoUrl]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    reset(profile);
    setSocialLinks(profile.socialMediaLinks?.length ? profile.socialMediaLinks : [emptySocialLink]);
  }, [profile, reset]);

  const updateSocialLink = (index, field, value) => {
    setSocialLinks((links) => links.map((link, currentIndex) => (currentIndex === index ? { ...link, [field]: value } : link)));
  };

  const addSocialLink = () => setSocialLinks((links) => [...links, emptySocialLink]);
  const removeSocialLink = (index) => setSocialLinks((links) => links.filter((_, currentIndex) => currentIndex !== index));

  const onSubmit = async (values) => {
    const formData = new FormData();
    ['companyName', 'address', 'phone', 'email', 'website'].forEach((field) => {
      formData.append(field, values[field] || '');
    });
    formData.append('socialMediaLinks', JSON.stringify(socialLinks.filter((link) => link.platform || link.url)));

    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const updated = await updateCompanyProfile(formData);
      setProfile(updated);
      setLogo(null);
      toast.success('Company settings updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update company settings');
    }
  };

  return (
    <section className="mt-8 rounded border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">Company Settings</h2>
          <p className="mt-1 text-sm text-slate-600">Manage public company identity and contact information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <div>
          <div className="grid aspect-square place-items-center overflow-hidden rounded border border-slate-200 bg-surface">
            {previewLogo ? (
              <img src={previewLogo} alt={profile.companyName} className="h-full w-full object-contain p-4" />
            ) : (
              <FiUpload className="text-4xl text-slate-400" />
            )}
          </div>
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <FiUpload /> Upload Logo
            <input className="hidden" type="file" accept="image/*" onChange={(event) => setLogo(event.target.files?.[0] || null)} />
          </label>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Company Name
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('companyName')} />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Website
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('website')} />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Phone
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" {...register('phone')} />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input className="mt-2 w-full rounded border border-slate-300 px-3 py-2" type="email" {...register('email')} />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Address
            <textarea className="mt-2 min-h-24 w-full rounded border border-slate-300 px-3 py-2" {...register('address')} />
          </label>

          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-700">Social Media Links</h3>
              <button type="button" onClick={addSocialLink} className="inline-flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
                <FiPlus /> Add
              </button>
            </div>
            <div className="mt-3 grid gap-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[180px_1fr_44px]">
                  <input
                    className="rounded border border-slate-300 px-3 py-2"
                    placeholder="Platform"
                    value={link.platform}
                    onChange={(event) => updateSocialLink(index, 'platform', event.target.value)}
                  />
                  <input
                    className="rounded border border-slate-300 px-3 py-2"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(event) => updateSocialLink(index, 'url', event.target.value)}
                  />
                  <button type="button" onClick={() => removeSocialLink(index)} className="grid h-10 w-10 place-items-center rounded border border-slate-300 text-slate-600">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-fit">
            <FiSave /> Save Settings
          </Button>
        </div>
      </form>
    </section>
  );
}
