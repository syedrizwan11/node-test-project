import { User } from "../models/user.model.js"
import { CustomError } from "../utils/customError.js"
import jwt from "jsonwebtoken"

const generateToken = (id, name, role) => {
  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const generateCookieString = (token) => {
  return `token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${process.env.COOKIE_EXPIRES_IN}; Secure`
}

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new CustomError(409, "user already exists")

  const user = new User({ name, email, password })

  await user.save()

  return { id: user._id, name: user.name, email: user.email }
}

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new CustomError(400, "Invalid credentials")

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new CustomError(400, "Invalid credentials")

  const token = generateToken(user._id, user.name, user.role)
  const generatedCookieString = generateCookieString(token)

  return {
    generatedCookieString,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  }
}
