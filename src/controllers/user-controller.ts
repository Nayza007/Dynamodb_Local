import express, { Request, Response, NextFunction } from "express";
import { createUserDynamodb } from "../repositories/user-repository";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, password } = req.body;
  try {
    const result = await createUserDynamodb(username, password).catch((x) => x);
    if (result.message) {
      res.status(400).json({ Error: "Dynamodb create user error" });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};
