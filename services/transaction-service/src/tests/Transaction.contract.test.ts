import { GenericContainer, StartedTestContainer } from "testcontainers";
import { fetchGoalsFromGoalService } from "../utils/fetchGoalsFromGoalService";

describe("Contract test: transaction-service -> goal-service (getGoals)", () => {
  let container: StartedTestContainer | null = null;
  let wiremockPort: number;

  jest.setTimeout(30000);

  beforeAll(async () => {
    container = await new GenericContainer("wiremock/wiremock")
      .withExposedPorts(8080)
      .start();

    wiremockPort = container.getMappedPort(8080);
    process.env.GOAL_SERVICE_URL = `http://localhost:${wiremockPort}`;

    await fetch(`http://localhost:${wiremockPort}/__admin/mappings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: {
          method: "GET",
          url: "/goals",
          headers: {
            "x-user-id": {
              equalTo: "67fe646a5f9638875921ad2e",
            },
          },
        },
        response: {
          status: 200,
          jsonBody: [
            {
              _id: "1",
              goalName: "Buy a bike",
              targetAmount: 1000,
              currentAmount: 500,
              status: "in_progress",
            },
          ],
        },
      }),
    });
  });

  afterAll(async () => {
    if (container) {
      await container.stop();
    }
  });

  it("should fetch goals from mocked goal-service", async () => {
    const goals = await fetchGoalsFromGoalService("67fe646a5f9638875921ad2e");

    expect(goals).toHaveLength(1);
    expect(goals[0].goalName).toBe("Buy a bike");
    expect(goals[0].targetAmount).toBe(1000);
  });
});
