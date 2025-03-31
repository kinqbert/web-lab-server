import TransactionModel, { ITransaction } from "../models/TransactionModel";

export const createTransaction = async (transactionData: ITransaction) => {
  const { userId, amount, type, category, description, transactionDate } =
    transactionData;

  const newTransaction = await TransactionModel.create({
    userId,
    amount,
    type,
    category,
    description,
    transactionDate,
  });

  return newTransaction;
};

export const deleteTransaction = async (id: string) => {
  const deleted = await TransactionModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Transaction not found");
  }
};

export const getTransactions = async (options: {
  sort: "asc" | "desc";
  category: string;
  type: string;
}) => {
  const { type, category, sort } = options;

  const filter: any = {};
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
