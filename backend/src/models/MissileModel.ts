import mongoose, { Schema, Document } from "mongoose";

export interface IMissile extends Document {
    idUser: string;
    missileName: string;
    location: string;
  }

  const missileSchema: Schema<IMissile> = new Schema<IMissile>({
    idUser: {
      type: String,
      required: true,
    },
    missileName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  });

  export default mongoose.model<IMissile>("Missile", missileSchema);