import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./authenticate";
import { JwtPayload } from "jsonwebtoken";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).token;

    const role = (user as JwtPayload & { role: string }).role;

    if (!allowedRoles.includes(role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};
