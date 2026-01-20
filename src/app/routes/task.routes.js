import { Router } from "express"
import {
  assignTaskController,
  createTaskController,
  deleteTaskController,
  getTasksController,
  markTaskAsCompletedController,
  updateTaskController,
} from "../controllers/task.controller.js"
import { auth } from "../middlewares/auth.js"
const router = Router()

router.post("/tasks", auth(), createTaskController)
router.get("/tasks", auth(), getTasksController)
router.delete("/tasks/:id", auth(), deleteTaskController)
router.patch("/tasks/:id", auth(), updateTaskController)

router.patch("/assign-task", auth(["admin"]), assignTaskController)
router.patch("/mark-completed-task", auth(), markTaskAsCompletedController)
export default router
