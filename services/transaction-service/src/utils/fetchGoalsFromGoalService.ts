export const fetchGoalsFromGoalService = async (userId: string) => {
  const res = await fetch(`${process.env.GOAL_SERVICE_URL}/goals`, {
    headers: {
      "x-user-id": userId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch goals from goal-service");
  }

  return await res.json();
};
