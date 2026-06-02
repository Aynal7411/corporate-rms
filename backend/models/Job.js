import mongoose from 'mongoose';
import slugify from 'slugify';

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    vacancy: { type: Number, default: 1, min: 1 },
    salary: String,
    deadline: { type: Date, required: true, index: true },
    requirements: [String],
    responsibilities: [String],
    location: String,
    employmentType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract', 'Temporary'],
      default: 'Full Time'
    },
    applicationFee: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft', index: true }
  },
  { timestamps: true }
);

jobSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Job', jobSchema);
