import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true, index: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Shortlisted', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true
    },
    rollNumber: { type: String, unique: true, sparse: true },
    examDate: Date,
    examCenter: String,
    admitCardUrl: String,
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
