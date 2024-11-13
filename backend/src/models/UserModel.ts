import mongoose, { Schema, Document } from "mongoose";

export interface IMissile {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}

export interface IResources {
  missile: IMissile;
  amount: number;
}

export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  organization: string;
  location?: string;
  resources: IResources[];
  budget: number;
}

const userSchema: Schema<IUser> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  resources: [
    {
      missile: {
        type: {
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          speed: {
            type: Number,
            required: true,
          },
          intercepts: {
            type: [String],
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  budget: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
