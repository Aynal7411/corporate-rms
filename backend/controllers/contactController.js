import ContactMessage from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json(message);
});

export const listContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

export const getContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  res.json(message);
});

export const updateContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  res.json(message);
});

export const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Contact message not found');
  }
  res.json({ message: 'Deleted successfully' });
});
