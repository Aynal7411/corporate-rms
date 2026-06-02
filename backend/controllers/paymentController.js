import Payment from '../models/Payment.js';
import Application from '../models/Application.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('application candidate').sort({ createdAt: -1 });
  res.json(payments);
});

export const recordPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.create(req.body);

  if (payment.status === 'Paid') {
    await Application.findByIdAndUpdate(payment.application, { paymentStatus: 'Paid' });
  }

  res.status(201).json(payment);
});
