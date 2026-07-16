import { Router, Request, Response } from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import db from '../data/db'
import dotenv from 'dotenv'
import { supabase } from '../data/supabase'

dotenv.config()

const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true'

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";


router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const newId = crypto.randomUUID();

    if (USE_MOCK_DB) {
      const checkUser = db.prepare("SELECT * FROM users WHERE username = ?");
      const userExists = checkUser.get(username);

      if (userExists) {
        return res.status(400).json({ message: "Username already taken" })
      }

      const insertUser = db.prepare('INSERT INTO users (id, username, passwordHash) VALUES (?, ?, ?)')
      insertUser.run(newId, username, hashPassword)
    } else {
      console.log('Registering via supabase live db')
      const { data: existingUser } = await supabase.from('users').select('*').eq('username', username).single()

      if (existingUser) {
        return res.status(400).json({ message: "username already taken" })
      }

      const { error: insertError } = await supabase.from('users').insert([{ id: newId, username, passwordHash: hashPassword }])
      if (insertError) throw insertError
    }

    return res.status(201).json({ message: "User Registered Successfully!" })
  } catch (error) {
    return res.status(500).json({ message: "Server registration error" });
  }
})

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    let user;
    if (USE_MOCK_DB) {
      const findUser = db.prepare('SELECT * FROM users WHERE username = ?')
      user = findUser.get(username) as any;

    } else {
      console.log("🟢 Logging in from LIVE Supabase");
      const { data } = await supabase.from('users').select('*').eq('username', username).single();
      user = data;
    }


    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1m" })

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
