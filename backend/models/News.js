import mongoose from 'mongoose';
import slugify from 'slugify';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    thumbnail: String,
    description: { type: String, required: true },
    category: { type: String, index: true },
    publishDate: Date,
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true }
  },
  { timestamps: true }
);

newsSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('News', newsSchema);
