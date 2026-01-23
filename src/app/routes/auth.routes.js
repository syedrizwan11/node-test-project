import { Router } from "express"
import {
  logoutController,
  registerController,
  tokedDecodeController,
} from "../controllers/auth.controller.js"
import { loginController } from "../controllers/auth.controller.js"
const router = Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/decodeToken", tokedDecodeController)
router.post("/logout", logoutController)

export default router
