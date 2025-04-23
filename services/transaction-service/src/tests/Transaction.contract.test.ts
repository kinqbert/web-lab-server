import { GenericContainer, StartedTestContainer } from "testcontainers";

describe("Contract test for goal-service dependency", () => {
  let container: StartedTestContainer | null = null;
  let wiremockPort: number;

  jest.setTimeout(30000);

  beforeAll(async () => {
    container = await new GenericContainer("wiremock/wiremock")
      .withExposedPorts(8080)
      .start();

    wiremockPort = container.getMappedPort(8080);

    await fetch(`http://localhost:${wiremockPort}/__admin/mappings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request: {
          method: "GET",
          url: "/goals/67fe646a5f9638875921ad2e",
        },
        response: {
          status: 200,
          jsonBody: {
            _id: "67fe646a5f9638875921ad2e",
            goalName: "Buy a new laptop",
            targetAmount: 1500,
            currentAmount: 1000,
            deadline: "2025-06-01T00:00:00.000Z",
            status: "in_progress",
          },
        },
      }),
    });
  });

  afterAll(async () => {
    if (container) {
      await container.stop();
    }
  });

  it("should fetch goal info from wiremock", async () => {
    const res = await fetch(
      `http://localhost:${wiremockPort}/goals/67fe646a5f9638875921ad2e`
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.goalName).toBe("Buy a new laptop");
  });
});
