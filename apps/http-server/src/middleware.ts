import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken"

declare module "express" {
    export interface Request {
      userId?: string;
    }
  }

export default function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] ?? ""
    const decoded: {userId: string} = jwt.verify(token, JWT_SECRET) as {userId: string}
    
    if(decoded.userId) { 
        req.userId = decoded.userId
        next()
    }
    else {
        res.json({
            message: "Please Login"
        }).status(403)
    }
}   