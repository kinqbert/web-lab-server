import GoalModel from "../models/GoalModel";
import { subscribe } from "../rabbit";
import { GOAL_STATUS } from "../types/GoalStatus";

export async function listenTransactions() {
  await subscribe(
    "transactions",
    "transaction.created",
    "goal-service-tx",
    async (payload) => {
      const { goalId, userId, amount, type } = payload;

      if (!goalId || type !== "income") return;

      const goal = await GoalModel.findOneAndUpdate(
        { _id: goalId, userId },
        {
          $inc: { currentAmount: amount },
        },
        { new: true }
      );

      if (!goal) return;

      if (
        goal.status === "in_progress" &&
        goal.currentAmount >= goal.targetAmount
      ) {
        goal.status = GOAL_STATUS.COMPLETED;
      }

      await goal.save();
    }
  );
}
