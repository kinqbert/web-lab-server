import mongoose from "mongoose";
import { createUser, loginUser } from "../services/UserServices";
import UserModel from "../models/UserModel";
import RefreshTokenModel from "../models/RefreshTokenModel";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test-db");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("User service integration tests", () => {
  const testUser = {
    name: "testuser",
    email: "test@example.com",
    password: "password123",
  };

  afterEach(async () => {
    await UserModel.deleteMany();
    await RefreshTokenModel.deleteMany();
  });

  it("should create a new user", async () => {
    const user = await createUser(
      testUser.name,
      testUser.email,
      testUser.password
    );

    expect(user).toBeDefined();
    expect(user.name).toBe(testUser.name);
    expect(user.email).toBe(testUser.email);

    const passwordMatch = await bcrypt.compare(
      testUser.password,
      user.password
    );
    expect(passwordMatch).toBe(true);
  });

  it("should throw error if username or email exists", async () => {
    await createUser(testUser.name, testUser.email, testUser.password);

    await expect(
      createUser(testUser.name, "new@example.com", testUser.password)
    ).rejects.toThrow("User with such username already exists.");

    await expect(
      createUser("newuser", testUser.email, testUser.password)
    ).rejects.toThrow("User with such email already exists.");
  });

  it("should login a valid user and return tokens", async () => {
    await createUser(testUser.name, testUser.email, testUser.password);

    const result = await loginUser(testUser.email, testUser.password);

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.user.name).toBe(testUser.name);
  });

  it("should fail login with wrong credentials", async () => {
    await createUser(testUser.name, testUser.email, testUser.password);

    await expect(loginUser(testUser.email, "wrongpassword")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  it("should throw validation error for invalid email", async () => {
    await expect(loginUser("not-an-email", "password123")).rejects.toThrow(
      '"email" must be a valid email'
    );
  });

  it("should throw validation error for short password", async () => {
    await expect(loginUser(testUser.email, "123")).rejects.toThrow(
      '"password" length must be at least 8 characters long'
    );
  });
});
