import GoalModel, { IGoal } from "../models/GoalModel";

export const createGoal = async (goalData: IGoal) => {
  const goal = await GoalModel.create(goalData);

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
    { userId },
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
