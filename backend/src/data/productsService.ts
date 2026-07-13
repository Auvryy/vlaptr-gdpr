import dotenv from "dotenv"
import { MOCK_PRODUCTS_DB } from "./db"

dotenv.config()

const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true'

export const fetchAllProducts = async () => {
  if (USE_MOCK_DB) {
    console.log('fetching from local DB...')
    return MOCK_PRODUCTS_DB
  } else {
    console.log('fetching from live database');
    return []
  }
}
