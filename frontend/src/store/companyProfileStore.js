import { create } from 'zustand';
import { getCompanyProfile } from '../services/companyProfileApi.js';

const fallbackProfile = {
  companyName: 'Corporate RMS',
  logoUrl: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  socialMediaLinks: []
};

export const useCompanyProfileStore = create((set) => ({
  profile: fallbackProfile,
  loading: false,
  setProfile: (profile) => set({ profile: { ...fallbackProfile, ...profile } }),
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const profile = await getCompanyProfile();
      set({ profile: { ...fallbackProfile, ...profile }, loading: false });
    } catch {
      set({ loading: false });
    }
  }
}));
