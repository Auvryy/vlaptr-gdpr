import dotenv from "dotenv"
import db from "./db"
import { supabase } from './supabase'

dotenv.config()
const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true'

export const fetchAllProducts = async () => {
  if (USE_MOCK_DB) {
    console.log('fetching from local DB...')
    const query = db.prepare('SELECT * FROM products')
    const products = query.all()

    return products

  } else {
    console.log('fetching from live database');
    const { data: products, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error(`Supabase error. ${error.message}`)
      throw error
    }

    return products || []
  }
}
