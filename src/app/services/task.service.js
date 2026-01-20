import { Task } from "../models/task.model.js"
import { CustomError } from "../utils/customError.js"

export const createTask = async (title, description, dueDate, user) => {
  console.log(user, dueDate)
  const task = await Task.create({
    title,
    description,
    dueDate,
    createdBy: user.id,
  })
  return { task }
}

export const getTasks = async (user) => {
  const filter =
    user.role === "admin"
      ? {}
      : { $or: [{ assignedTo: user.id }, { createdBy: user.id }] }

  const tasks = await Task.find(filter)
  return { tasks }
}

export const updateTask = async (taskId, title, description, dueDate, user) => {
  const task = await Task.findById(taskId)
  console.log(user)
  if (!task) throw new CustomError(404, "Task not found")

  if (user.role !== "admin" && task.createdBy.toString() !== user.id) {
    throw new CustomError(403, "forbidden: cannot update this task")
  }
  console.log(task)
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, dueDate },
    {
      new: true,
    },
  )

  return { updatedTask }
}

export const markTaskAsCompleted = async (taskId, user) => {
  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")
  if (user.role !== "admin" && task.assignedTo.toString() !== user.id) {
    throw new CustomError(403, "forbidden: cannot update this task")
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { status: "completed", completedAt: new Date() },
    {
      new: true,
    },
  )
  return { status: updatedTask.status }
}

export const assignTask = async (taskId, assignedTo, user) => {
  if (user.role !== "admin")
    throw new CustomError(403, "only admins can assign tasks to others")

  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")

  const updatedTask = await Task.findByIdAndUpdate(taskId, { assignedTo })
  return { updatedTask }
}

export const deleteTask = async (taskId, user) => {
  if (user.role !== "admin" && task.createdBy.toString() !== user.id) {
    throw new CustomError(403, "forbidden: cannot delete this task")
  }
  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")

  if (user.role !== "admin" && task.createdBy.toString() !== user.id) {
    throw new CustomError(403, "forbidden: cannot delete this task")
  }

  await task.deleteOne()
}
