import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import User from "../models/User";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, "Giabao2001", (err: any, decoded: any) => {
      if (err) {
        console.error(err.message);
        res.redirect("./login");
      } else {
        console.log(decoded);
      }
    });
  } else {
    res.redirect("./login");
  }

  next();
};

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  res.locals.user = null;

  if (token) {
    jwt.verify(token, "Giabao2001", async (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        console.log(res.locals);
        next();
      }
    });
  } else {
    next();
  }
};
