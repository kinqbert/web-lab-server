import GoalModel, { IGoal } from "../models/GoalModel";
import { GOAL_STATUS } from "../types/GoalStatus";

export const createGoal = async (
  goalData: Pick<IGoal, "targetAmount" | "goalName" | "deadline">,
  userId: string
) => {
  const goal = await GoalModel.create({
    targetAmount: goalData.targetAmount,
    goalName: goalData.goalName,
    deadline: goalData.deadline,
    userId,
  });

  return goal;
};

export const updateGoal = async (id: string, goalData: Partial<IGoal>) => {
  const goal = await GoalModel.findByIdAndUpdate(id, goalData, { new: true });

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
};

export const getGoals = async (userId: string) => {
  const goals = await GoalModel.find(
    {
      userId,
      status: {
        $in: [GOAL_STATUS.COMPLETED, GOAL_STATUS.IN_PROGRESS],
      },
    },
    {
      _id: 1,
      goalName: 1,
      targetAmount: 1,
      currentAmount: 1,
      deadline: 1,
      status: 1,
    }
  ).lean();

  return goals;
};
