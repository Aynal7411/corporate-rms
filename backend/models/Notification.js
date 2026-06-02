import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['Application', 'Payment', 'Admit Card', 'System'], default: 'System' },
    readAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
