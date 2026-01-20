import express from "express"
import dotenv from "dotenv/config"
import cors from "cors"
import { CustomError } from "./app/utils/customError.js"
import connectDB from "./database/connection.js"
import authRoutes from "./app/routes/auth.routes.js"
import taskRoutes from "./app/routes/task.routes.js"
import { errorHandlerMiddleware } from "./app/middlewares/errorHandlerMiddleware.js"
const app = express()

connectDB()

app.use(express.json())

app.use(cors())

app.use("/auth", authRoutes)
app.use("/api", taskRoutes)

app.use((req, res, next) => {
  throw new CustomError(404, "invalid address")
})

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is running on the port ${PORT}`))
