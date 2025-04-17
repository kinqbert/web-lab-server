import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const [result] = await UserModel.aggregate([
    {
      $facet: {
        matchedEmailUser: [{ $match: { email } }, { $limit: 1 }],
        matchedNameUser: [{ $match: { name } }, { $limit: 1 }],
      },
    },
    {
      $project: {
        matchedEmailUser: { $arrayElemAt: ["$matchedEmailUser", 0] },
        matchedNameUser: { $arrayElemAt: ["$matchedNameUser", 0] },
      },
    },
  ]);

  if (result.matchedNameUser) {
    throw new Error("User with such username already exists.");
  }

  if (result.matchedEmailUser) {
    throw new Error("User with such email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.find({ email, password });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
