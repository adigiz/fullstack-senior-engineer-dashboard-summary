import bcrypt from "bcrypt";
import { AppDataSource } from "../database"; // Assuming you have your AppDataSource here
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (
  username: string,
  password: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.username = username;
  user.password = hashedPassword;
  user.role = role;

  await userRepository.save(user);
  return user;
};

export const findUserByUsername = async (username: string) => {
  return await userRepository.findOne({ where: { username } });
};

export const validateUser = async (username: string, password: string) => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return token;
};
