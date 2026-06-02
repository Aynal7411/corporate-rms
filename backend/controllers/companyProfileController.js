import CompanyProfile from '../models/CompanyProfile.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBuffer } from '../services/cloudinaryService.js';

const defaultProfile = {
  companyName: 'Corporate RMS',
  logoUrl: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  socialMediaLinks: []
};

const parseSocialLinks = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const getProfileDocument = async () => {
  const profile = await CompanyProfile.findOne();
  if (profile) return profile;

  return CompanyProfile.create(defaultProfile);
};

export const getCompanyProfile = asyncHandler(async (req, res) => {
  const profile = await getProfileDocument();
  res.json(profile);
});

export const updateCompanyProfile = asyncHandler(async (req, res) => {
  const profile = await getProfileDocument();
  const fields = ['companyName', 'address', 'phone', 'email', 'website', 'logoUrl'];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  });

  profile.socialMediaLinks = parseSocialLinks(req.body.socialMediaLinks);

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer, 'company-profile');
    profile.logoUrl = result.secure_url;
  }

  await profile.save();
  res.json(profile);
});
