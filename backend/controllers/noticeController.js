import Notice from '../models/Notice.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOne, deleteOne, getOne, list, updateOne } from './crudFactory.js';

export const listNotices = asyncHandler(list(Notice));
export const getNotice = asyncHandler(getOne(Notice));
export const createNotice = asyncHandler(createOne(Notice));
export const updateNotice = asyncHandler(updateOne(Notice));
export const deleteNotice = asyncHandler(deleteOne(Notice));
