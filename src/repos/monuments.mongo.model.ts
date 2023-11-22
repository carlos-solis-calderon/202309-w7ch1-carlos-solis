import { Schema, model } from 'mongoose';
import { Monument } from '../entities/entities.js';

const monumentsSchema = new Schema<Monument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export const MonumentModel = model('Monument', monumentsSchema, 'monuments');
