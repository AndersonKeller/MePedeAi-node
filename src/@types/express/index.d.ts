import * as express from "express";
enum typeUser {
  establish = "establish",
  client = "client",
}
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        admin: boolean;
        type: typeUser;
      };
    }
  }
}
