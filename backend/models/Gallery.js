import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: String,
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
