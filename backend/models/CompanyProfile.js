import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, trim: true },
    url: { type: String, trim: true }
  },
  { _id: false }
);

const companyProfileSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true, default: 'Corporate RMS' },
    logoUrl: String,
    address: String,
    phone: String,
    email: String,
    website: String,
    socialMediaLinks: [socialLinkSchema]
  },
  { timestamps: true }
);

export default mongoose.model('CompanyProfile', companyProfileSchema);
