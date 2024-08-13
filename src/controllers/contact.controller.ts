import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../config/httpStatusCodes";
import { messages } from "../config/messages";

export const identifyContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, email } = req.body;
    return res.status(HttpStatusCode.CREATED).json({ phoneNumber, email });
  } catch (error) {
    next(error);
  }
};
