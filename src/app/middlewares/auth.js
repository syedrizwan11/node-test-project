import jwt from "jsonwebtoken"
import { CustomError } from "../utils/customError.js"
import { verifyToken } from "../services/auth.service.js"

export const auth =
  (allowedRoles = []) =>
  async (req, res, next) => {
    try {
      const token = req.cookies?.token
      if (!token) {
        return next(new CustomError(401, "Unauthorized: No token provided"))
      }

      let decoded = verifyToken(token)

      if (!decoded) next(new CustomError(401, "Unauthorized: Invalid token"))

      req.user = decoded

      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return next(
          new CustomError(
            403,
            `Forbidden: requires one of [${allowedRoles.join(", ")}]`,
          ),
        )
      }

      next()
    } catch (error) {
      next(new CustomError(500, "Internal Server Error"))
    }
  }
