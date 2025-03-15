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
