import mongoose, { Schema } from "mongoose";
import { TRANSACTION_TYPE } from "../types/TransactionType";

export interface ITransaction {
  userId: string;
  amount: number;
  type: TRANSACTION_TYPE;
  category: string;
  description?: string;
  transactionDate: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: TRANSACTION_TYPE,
    required: true,
  },
  category: { type: String, required: true },
  description: { type: String },
  transactionDate: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("transactions", TransactionSchema);
