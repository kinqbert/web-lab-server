import UserModel from "../models/UserModel";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const newUser = await UserModel.create({
    name,
    email,
    password,
  });

  return newUser;
};

// TODO -- макс, ти там казав за jwt чи шось таке, можливо це тут потрібно буде
export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.find({ email, password });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
