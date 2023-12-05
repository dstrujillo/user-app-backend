import { Schema, model } from 'mongoose';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minLength: 6
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const UserModel = model<User>('User', userSchema);
