import { Router, Request, Response } from 'express'
import crypto from 'crypto'
import dotenv from 'dotenv'
import db from '../data/db'
import { supabase } from '../data/supabase'

dotenv.config()
const router = Router()
const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true'

router.get('/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params
    let cartItems;
    if (USE_MOCK_DB) {
      console.log('fetching from sqlite')
      const query = db.prepare(`
        SELECT c.id as cartItemId, c.quantity, p.*
        FROM cart_items c 
        JOIN products p ON c.productId = p.id 
        WHERE c.userId = ?
      `);
      cartItems = query.all(userId)
    } else {
      console.log("Fetching from live database.")
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, quantity, products(*)')
        .eq('userId', userId)

      if (error) throw error;

      cartItems = data.map((item: any) => ({
        cartItemId: item.id,
        quantity: item.quantity,
        ...item.products
      }));
    }
    return res.status(200).json({ cart: cartItems })
  } catch (error) {
    console.log(`error fetching cart: ${error}`)
  }
})

router.post("/add", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, productId, quantity = 1 } = req.body

    if (!userId || productId) {
      return res.status(400).json({ message: "user id and product id are required" })
    }

    const newId = crypto.randomUUID()

    if (USE_MOCK_DB) {
      console.log("adding to cart in local db")

      const checkItem = db.prepare('SELECT * FROM cart_items WHERE userId = ? AND productId = ?')
      const existingItem = checkItem.get(userId, productId) as any;

      if (existingItem) {
        const updateItem = db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?')
        updateItem.run(quantity, existingItem.id)
      } else {
        const insertItem = db.prepare('INSERT INTO cart_items (id, userId, productId, quantity) VALUES (?, ?, ?, ?)')
        insertItem.run(newId, userId, productId, quantity)
      }
    } else {
      console.log('adding to live database')
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('userId', userId)
        .eq('productId', productId)
        .single()

      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert([{ id: newId, userId, productId, quantity }])
        if (error) throw error
      }
    }

    return res.status(200).json({ message: "item added successfully" })
  } catch (error) {
    console.log(`error addint to cart: ${error}`)
    return res.status(500).json({ message: "server error adding to cart" })

  }
})


export default router;
