import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true },
    department: { type: String, index: true },
    biography: String,
    email: String,
    mobile: String,
    phone: String,
    photo: String,
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

officerSchema.index({ name: 'text', designation: 'text', department: 'text' });

export default mongoose.model('Officer', officerSchema);
