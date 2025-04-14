import mongoose, { Schema, Document } from "mongoose";

export interface IGoal {
  _id: string;
  userId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: "in_progress" | "completed" | "failed";
  createdAt: Date;
}

const GoalSchema = new Schema({
  userId: { type: String, required: true },
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date },
  status: {
    type: String,
    enum: ["in_progress", "completed", "failed"],
    default: "in_progress",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGoal>("Goal", GoalSchema);
