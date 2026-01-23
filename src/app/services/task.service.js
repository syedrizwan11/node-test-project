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
    .populate("createdBy", "email")
    .populate({
      path: "assignedTo",
      select: "email",
      match: { _id: { $ne: null } },
    })
  return { tasks }
}
export const getTaskById = async (taskId, user) => {
  const task = await Task.findById(taskId)
  if (!task) throw new CustomError(404, "Task not found")

  if (
    user.role !== "admin" &&
    task.createdBy.toString() !== user.id &&
    task.assignedTo.toString() !== user.id
  ) {
    throw new CustomError(403, "forbidden: cannot access this task")
  }
  return { task }
}

export const updateTask = async (taskId, title, description, dueDate, user) => {
  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")

  if (task.createdBy.toString() !== user.id) {
    throw new CustomError(403, "forbidden: cannot update this task")
  }
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
  return { updatedTask }
}

export const assignTask = async (taskId, assignedTo, user) => {
  if (user.role !== "admin")
    throw new CustomError(403, "only admins can assign tasks to others")

  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { assignedTo },
    {
      new: true,
    },
  ).populate("assignedTo", "email")
  return { updatedTask }
}

export const deleteTask = async (taskId, user) => {
  const task = await Task.findById(taskId)

  if (!task) throw new CustomError(404, "Task not found")

  let canDelete =
    user.role === "admin" ||
    (task.createdBy.toString() === user.id &&
      (!task.assignedTo || task.assignedTo?.toString() === user.id))

  if (!canDelete) {
    throw new CustomError(403, "forbidden: cannot delete this task")
  }

  await task.deleteOne()
}

export const getTaskCount = async (user) => {
  if (user.role !== "admin")
    throw new CustomError(403, "only admins can access task count")

  const count = await Task.countDocuments({})
  return { count }
}
