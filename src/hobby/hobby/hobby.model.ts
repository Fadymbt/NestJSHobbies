import * as mongoose from 'mongoose';

export const HobbySchema = new mongoose.Schema(
  {
    passion_level: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High', 'Very-High'],
    },
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export interface Hobby {
  id: string;
  passionLevel: string;
  name: string;
  year: string;
}
