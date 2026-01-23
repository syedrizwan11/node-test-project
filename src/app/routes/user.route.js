import { Router } from "express"
import {
  createUserController,
  deleteUserController,
  getCurrentUserController,
  getUserController,
  getUserCountController,
  updateUserProfileController,
} from "../controllers/user.controller.js"
import { auth } from "../middlewares/auth.js"

const router = Router()
router.post("/users", auth(["admin"]), createUserController)
router.get("/users", auth(["admin"]), getUserController)
router.get("/current-user", auth(), getCurrentUserController)
router.patch("/update-user-profile", auth(), updateUserProfileController)
router.delete("/users/:id", auth(["admin"]), deleteUserController)
router.get("/users-count", auth(["admin"]), getUserCountController)

export default router
