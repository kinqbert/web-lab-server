import GoalModel from "../models/GoalModel";

export const transactionEventHandler = async (event: {
  userId: any;
  amount: any;
  type: string;
}) => {
  if (!event || !event.userId || !event.amount) return;

  if (event.type !== "income") return;

  const goals = await GoalModel.updateMany(
    { userId: event.userId, status: "in_progress" },
    { $inc: { currentAmount: event.amount } }
  );

  await GoalModel.updateMany(
    {
      userId: event.userId,
      status: "in_progress",
      $expr: { $gte: ["$currentAmount", "$targetAmount"] },
    },
    { $set: { status: "completed" } }
  );

  console.log(
    `🎯 Updated ${goals.modifiedCount} goal(s) for user ${event.userId}`
  );
};
