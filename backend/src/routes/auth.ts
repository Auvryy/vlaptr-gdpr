import { Router, Request, Response } from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import { MOCK_USERS_DB, UserRow } from '../data/db'

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";


router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." })
    }

    const userExists = MOCK_USERS_DB.find((u) => u.username === username)
    if (userExists) {
      return res.status(400).json({ message: "Username already taken" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser: UserRow = {
      id: crypto.randomUUID(),
      username,
      passwordHash: hashPassword,
    }
    MOCK_USERS_DB.push(newUser)

    return res.status(201).json({ message: "User Registered Successfully!" })
  } catch (error) {
    return res.status(500).json({ message: "Server registration error" });
  }
})

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    const user = MOCK_USERS_DB.find((u) => u.username === username)
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

    return res.json({
      message: "Login Successful!",
      token,
      user: { id: user.id, username: user.username }
    })
  } catch (error) {
    return res.status(500).json({ message: "Server login error." })
  }
})


export default router;
