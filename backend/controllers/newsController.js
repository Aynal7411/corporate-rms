import News from '../models/News.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOne, deleteOne, getOne, list, updateOne } from './crudFactory.js';

export const listNews = asyncHandler(list(News));
export const getNews = asyncHandler(getOne(News));
export const createNews = asyncHandler(createOne(News));
export const updateNews = asyncHandler(updateOne(News));
export const deleteNews = asyncHandler(deleteOne(News));
