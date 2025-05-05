import TransactionModel, { ITransaction } from "../models/TransactionModel";
import { publish } from "../rabbit";
import { TRANSACTION_TYPE } from "../types/TransactionType";

export const createTransaction = async (
  transactionData: ITransaction & { goalId?: string },
  userId: string
) => {
  const { amount, type, category, description, transactionDate, goalId } =
    transactionData;

  const newTransaction = await TransactionModel.create({
    userId,
    amount,
    type,
    category,
    description,
    transactionDate,
  });

  await publish("transactions", "transaction.created", {
    id: newTransaction._id,
    userId,
    amount,
    type,
    category,
    transactionDate,
    goalId: goalId ?? null,
  });

  return newTransaction;
};

export const deleteTransaction = async (id: string) => {
  const deleted = await TransactionModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Transaction not found");
  }

  await publish("transactions", "transaction.deleted", { id });
};

export const getTransactions = async (
  userId: string,
  options: {
    sort: "asc" | "desc";
    category: string;
    type: string;
  }
) => {
  const { type, category, sort } = options;

  const filter: any = {
    userId,
  };
  if (type) filter.type = type;
  if (category) filter.category = category;

  let query = TransactionModel.find(filter);

  if (sort === "asc") {
    query = query.sort({ transactionDate: 1 });
  } else if (sort === "desc") {
    query = query.sort({ transactionDate: -1 });
  }

  const transactions = await query.exec();

  return transactions;
};

export const getAnalyticsSummary = async (userId: string) => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const aggResult = await TransactionModel.aggregate([
    { $match: { userId } },
    {
      $facet: {
        month: [
          { $match: { transactionDate: { $gte: start } } },
          {
            $group: {
              _id: "$type",
              total: { $sum: "$amount" },
            },
          },
        ],
      },
    },
  ]);

  const result = aggResult[0] as {
    month: (ITransaction & { _id: string; total: number })[];
  };

  const incomeMonth =
    result.month.find((x) => x._id === TRANSACTION_TYPE.INCOME)?.total || 0;
  const expenseMonth =
    result.month.find((x) => x._id === "expense")?.total || 0;

  return {
    balance: incomeMonth - expenseMonth,
    incomeMonth,
    expenseMonth,
  };
};

export const getAnalyticsCategories = async (userId: string) => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const data = await TransactionModel.aggregate([
    {
      $match: {
        userId,
        type: TRANSACTION_TYPE.EXPENSE,
        transactionDate: { $gte: start },
      },
    },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $project: { _id: 0, category: "$_id", total: 1 } },
    { $sort: { total: -1 } },
  ]);

  return data;
};

export const getAnalyticsTimeline = async (userId: string) => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const data = await TransactionModel.aggregate([
    { $match: { userId, transactionDate: { $gte: start } } },
    {
      $group: {
        _id: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
          },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $group: {
        _id: "$_id.day",
        income: {
          $sum: { $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0] },
        },
        expense: {
          $sum: { $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0] },
        },
      },
    },
    { $project: { _id: 0, date: "$_id", income: 1, expense: 1 } },
    { $sort: { date: 1 } },
  ]);

  return data;
};
