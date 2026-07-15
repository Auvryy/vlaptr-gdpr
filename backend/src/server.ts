import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from './routes/auth'
import productRoutes from './routes/product'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

app.listen(PORT, () => {
  console.log(`! ! ! Backend running on http://localhost:${PORT}`)
})

