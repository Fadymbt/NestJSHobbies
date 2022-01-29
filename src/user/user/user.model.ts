import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z]+$/,
    },
    hobbies: [String],
  },
  { versionKey: false },
);

export interface User {
  id: string;
  name: string;
  hobbies: string[];
}
