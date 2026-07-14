import { Router, Request, Response } from 'express'
import { fetchAllProducts } from '../data/productsService'

const router = Router()

router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await fetchAllProducts()

    return res.status(200).json({
      message: "Procuts fetched successfully",
      products: products
    });
  } catch (error) {
    console.log(`Error fetching products ${error}`)
    return res.status(500).json({ message: 'server error fetchin products.' })
  }
})

export default router

