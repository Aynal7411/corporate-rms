import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true, index: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true, index: true },
    gateway: { type: String, enum: ['SSLCommerz', 'bKash', 'Nagad'], default: 'SSLCommerz' },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'BDT' },
    status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending', index: true },
    rawResponse: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
