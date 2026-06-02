import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    attachmentUrl: String,
    publishDate: Date,
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);
