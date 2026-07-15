import { useEffect, useState } from 'react'

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products")
        const data = await response.json()

        if (response.ok) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error('failed to fetch products: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading) {
    return <p className='text-gray-500/40 text-lg py-8 text-center '>Loading products...</p>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8'>
      {products.map((product) => (
        <div
          key={product.id}
          className='bg-white p-6 rounded-lg shadow-md border border-gray-600'
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className='w-full h-48 object-cover rounded mb-4'
          />
          <span>
            {product.category}
          </span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <div className='flex justify-between items-center mt-auto'>
            <span>{product.price}</span>
            <span>{product.stock}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

