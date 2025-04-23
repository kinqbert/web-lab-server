import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";
import { signAccess, signRefresh } from "../utils/jwt";
import RefreshTokenModel from "../models/RefreshTokenModel";
import Joi from "joi";

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

const LoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown(true);

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: { id: string; name: string };
}> => {
  const { error } = LoginUserSchema.validate({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const accessToken = signAccess({ id: user._id });
  const refreshToken = signRefresh({ id: user._id });

  await RefreshTokenModel.create({
    userId: user._id,
    token: refreshToken,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      name: user.name,
    },
  };
};
