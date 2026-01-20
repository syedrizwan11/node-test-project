import mongoose from "mongoose"
import { taskStatus } from "../constants/index.js"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [...taskStatus],
      default: taskStatus[0],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completedAt: Date,
  },
  { timestamps: true },
)

export const Task = mongoose.model("Task", taskSchema)
