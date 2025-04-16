import mongoose, { Schema, model } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string;
  token: string;
}

const RefreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
});

export default mongoose.model<IRefreshToken>(
  "refresh-tokens",
  RefreshTokenSchema
);
