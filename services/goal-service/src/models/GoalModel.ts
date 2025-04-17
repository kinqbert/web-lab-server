import mongoose, { Schema, Document } from "mongoose";
import { GOAL_STATUS } from "../types/GoalStatus";

export interface IGoal {
  _id: string;
  userId: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  status: GOAL_STATUS;
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
    enum: GOAL_STATUS,
    default: GOAL_STATUS.IN_PROGRESS,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGoal>("Goal", GoalSchema);
