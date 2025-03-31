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
