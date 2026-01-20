import { registerUser, loginUser } from "../services/auth.service.js"
import { apiResponse } from "../utils/apiResponse.js"
import { CustomError } from "../utils/customError.js"
import Joi from "joi"

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})
export const loginController = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body)
  if (error) {
    throw new CustomError(400, error.details[0].message)
  }
  const { email, password } = value
  try {
    const data = await loginUser(email, password)
    res.setHeader("Set-Cookie", data.generatedCookieString)
    apiResponse(res, 200, "user logged in", data.user)
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.statusCode, error.message)
    }
    throw new CustomError(500, "internal server error")
  }
}

export const registerController = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body)
  if (error) {
    throw new CustomError(400, error.details[0].message)
  }
  const { name, email, password } = value
  try {
    const data = await registerUser(name, email, password)

    apiResponse(res, 200, "user registered", data)
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.statusCode, error.message)
    }
    throw new CustomError(500, "internal server error")
  }
}
