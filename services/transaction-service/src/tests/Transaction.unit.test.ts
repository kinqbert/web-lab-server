import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getAnalyticsSummary,
  getAnalyticsCategories,
  getAnalyticsTimeline,
} from "../services/TransactionServices";
import TransactionModel from "../models/TransactionModel";
import { publish } from "../rabbit";
import { TRANSACTION_TYPE } from "../types/TransactionType";

jest.mock("../../src/models/TransactionModel");
jest.mock("../../src/rabbit");

describe("TransactionServices", () => {
  const mockTransaction = {
    userId: "user123",
    amount: 100,
    type: TRANSACTION_TYPE.INCOME,
    category: "Salary",
    description: "Monthly salary",
    transactionDate: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTransaction", () => {
    it("should create transaction and publish event", async () => {
      (TransactionModel.create as jest.Mock).mockResolvedValue({
        _id: "123",
        ...mockTransaction,
      });

      const result = await createTransaction(
        mockTransaction,
        mockTransaction.userId
      );

      expect(TransactionModel.create).toHaveBeenCalledWith(mockTransaction);
      expect(publish).toHaveBeenCalledWith(
        "transactions",
        "transaction.created",
        {
          id: "123",
          userId: mockTransaction.userId,
          amount: mockTransaction.amount,
          type: mockTransaction.type,
          category: mockTransaction.category,
          transactionDate: mockTransaction.transactionDate,
          goalId: null,
        }
      );
      expect(result).toHaveProperty("_id", "123");
    });
  });

  describe("deleteTransaction", () => {
    it("should delete transaction and publish event", async () => {
      (TransactionModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: "123",
      });

      await deleteTransaction("123");

      expect(TransactionModel.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(publish).toHaveBeenCalledWith(
        "transactions",
        "transaction.deleted",
        { id: "123" }
      );
    });

    it("should throw error if transaction not found", async () => {
      (TransactionModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(deleteTransaction("123")).rejects.toThrow(
        "Transaction not found"
      );
    });
  });

  describe("getTransactions", () => {
    it("should fetch and sort transactions", async () => {
      const transactionsMock = [mockTransaction];
      const execMock = jest.fn().mockResolvedValue(transactionsMock);
      const sortMock = jest.fn().mockReturnValue({ exec: execMock });
      (TransactionModel.find as jest.Mock).mockReturnValue({ sort: sortMock });

      const transactions = await getTransactions("user123", {
        type: TRANSACTION_TYPE.INCOME,
        category: "Salary",
        sort: "desc",
      });

      expect(TransactionModel.find).toHaveBeenCalledWith({
        userId: "user123",
        type: TRANSACTION_TYPE.INCOME,
        category: "Salary",
      });
      expect(sortMock).toHaveBeenCalledWith({ transactionDate: -1 });
      expect(transactions).toEqual(transactionsMock);
    });
  });

  describe("getAnalyticsSummary", () => {
    it("should compute summary correctly", async () => {
      (TransactionModel.aggregate as jest.Mock).mockResolvedValue([
        {
          month: [
            { _id: TRANSACTION_TYPE.INCOME, total: 2000 },
            { _id: TRANSACTION_TYPE.EXPENSE, total: 500 },
          ],
        },
      ]);

      const summary = await getAnalyticsSummary("user123");

      expect(summary).toEqual({
        balance: 1500,
        incomeMonth: 2000,
        expenseMonth: 500,
      });
    });
  });

  describe("getAnalyticsCategories", () => {
    it("should compute categories analytics correctly", async () => {
      const mockData = [{ category: "Food", total: 250 }];
      (TransactionModel.aggregate as jest.Mock).mockResolvedValue(mockData);

      const categories = await getAnalyticsCategories("user123");

      expect(TransactionModel.aggregate).toHaveBeenCalled();
      expect(categories).toEqual(mockData);
    });
  });

  describe("getAnalyticsTimeline", () => {
    it("should compute timeline analytics correctly", async () => {
      const mockData = [{ date: "2025-04-01", income: 500, expense: 200 }];
      (TransactionModel.aggregate as jest.Mock).mockResolvedValue(mockData);

      const timeline = await getAnalyticsTimeline("user123");

      expect(TransactionModel.aggregate).toHaveBeenCalled();
      expect(timeline).toEqual(mockData);
    });
  });
});
