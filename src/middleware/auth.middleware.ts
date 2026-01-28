import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types";
import {auth as betterAuth} from '../lib/auth'
import { success } from "better-auth";

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any
      })
      if(!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: 'You are not authenticated'
        })
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        user_role: session.user.user_role as UserRole,
        photo_url: session.user.photo_url || undefined
      }

      if(roles.length && !roles.includes(req.user.user_role)) {
        return res.status(403).json({
          success: false,
          message: "Forbiden! You're not authorized"
        })
      }

      next()

    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default auth;