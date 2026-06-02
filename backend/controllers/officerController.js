import Officer from '../models/Officer.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { deleteOne, getOne, list } from './crudFactory.js';
import { uploadBuffer } from '../services/cloudinaryService.js';

export const listOfficers = asyncHandler(list(Officer));
export const getOfficer = asyncHandler(getOne(Officer));
export const deleteOfficer = asyncHandler(deleteOne(Officer));

const officerFields = ['name', 'designation', 'department', 'biography', 'email', 'mobile', 'phone', 'status'];

const buildOfficerPayload = async (req) => {
  const payload = {};

  officerFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      payload[field] = req.body[field];
    }
  });

  if (payload.mobile && !payload.phone) {
    payload.phone = payload.mobile;
  }

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer, 'officers', req.file.mimetype);
    payload.photo = result.secure_url;
  }

  return payload;
};

export const createOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.create(await buildOfficerPayload(req));
  res.status(201).json(officer);
});

export const updateOfficer = asyncHandler(async (req, res) => {
  const officer = await Officer.findByIdAndUpdate(req.params.id, await buildOfficerPayload(req), {
    new: true,
    runValidators: true
  });

  if (!officer) {
    res.status(404);
    throw new Error('Officer not found');
  }

  res.json(officer);
});
