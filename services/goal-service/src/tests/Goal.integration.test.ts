import mongoose from "mongoose";
import { createGoal, updateGoal, getGoals } from "../services/GoalServices";
import GoalModel from "../models/GoalModel";
import { GOAL_STATUS } from "../types/GoalStatus";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test-db");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Goal service integration tests", () => {
  const userId = "67fe646a5f9638875921ad2e";

  afterEach(async () => {
    await GoalModel.deleteMany();
  });

  it("should create a new goal", async () => {
    const goal = await createGoal(
      {
        goalName: "Buy a bike",
        targetAmount: 500,
        deadline: new Date("2025-05-01"),
      },
      userId
    );

    expect(goal).toBeDefined();
    expect(goal.goalName).toBe("Buy a bike");
    expect(goal.targetAmount).toBe(500);
    expect(goal.userId).toBe(userId);
  });

  it("should update a goal", async () => {
    const goal = await createGoal(
      {
        goalName: "Learn guitar",
        targetAmount: 800,
        deadline: new Date("2025-06-01"),
      },
      userId
    );

    const updated = await updateGoal(goal._id.toString(), {
      currentAmount: 400,
      status: GOAL_STATUS.COMPLETED,
    });

    expect(updated.currentAmount).toBe(400);
    expect(updated.status).toBe(GOAL_STATUS.COMPLETED);
  });

  it("should throw if updating non-existing goal", async () => {
    await expect(
      updateGoal("645c7e499999999999999999", {
        currentAmount: 100,
      })
    ).rejects.toThrow("Goal not found");
  });

  it("should get all in_progress and completed goals", async () => {
    await createGoal(
      {
        goalName: "Trip to Lviv",
        targetAmount: 1200,
        deadline: new Date("2025-04-28"),
      },
      userId
    );

    await createGoal(
      {
        goalName: "Gaming chair",
        targetAmount: 700,
        deadline: new Date("2025-07-01"),
      },
      userId
    );

    const goals = await getGoals(userId);

    expect(goals.length).toBe(2);
    expect(goals[0]).toHaveProperty("goalName");
    expect(goals[0]).toHaveProperty("status");
  });
});
