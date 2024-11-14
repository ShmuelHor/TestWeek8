import mongoose, { Schema, Document } from "mongoose";

export interface IThreats extends Document {
    idUser: string;
    missileName: string;
    location: string;
    status : string;
    speed:number
  }
// "Launched" | "Hit" | "Intercepted"
  const threatsSchema: Schema<IThreats> = new Schema<IThreats>({
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
    status: {
      type: String,
      required: true,
    },
    speed:{
        type:Number,
        required:true
    }
  });

  export default mongoose.model<IThreats>("Threat", threatsSchema);