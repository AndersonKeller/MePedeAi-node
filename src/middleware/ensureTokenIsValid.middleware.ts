import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
export const ensureTokenvalidMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token: string | undefined = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    if (decoded.type != "establish") {
      throw new AppError("unsificient permission", 401);
    }
    request.user = {
      admin: decoded.admin,
      id: decoded.sub,
      type: decoded.type,
      establishId: decoded.establishId,
    };
  });
  return next();
};
