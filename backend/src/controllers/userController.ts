import { Request, Response } from "express";
import { createUser, validateUser } from "../services/userServices";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      res
        .status(400)
        .json({ message: "Username, password, and role are required" });
      return;
    }

    const newUser = await createUser(username, password, role);
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const token = await validateUser(username, password);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
