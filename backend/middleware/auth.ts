import jwt from "jsonwebtoken";
import env from 'dotenv';
env.config({path:'../.env'});
const SECRET = process.env.TOKEN_KEY;
import { Request,Response, NextFunction } from 'express';

export const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if(!SECRET){
        return res.status(500).json({"message":"Secret key is missing"});
    }
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SECRET, (err, payload) => {
        if (err || !payload || typeof payload === "string") {
          return res.sendStatus(403);
      }
        req.headers["userId"] = payload.email;        
        
       });
    }else{
        return res.status(403).send("A token is required for authentication");

    }
    return next();
};

