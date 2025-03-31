import mongoose, { Schema } from "mongoose";

export interface ITransaction {
  userId: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description?: string;
  transactionDate: Date;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: { type: String, required: true },
  description: { type: String },
  transactionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("transactions", TransactionSchema);
