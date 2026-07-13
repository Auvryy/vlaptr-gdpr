
export interface UserRow {
  id: string;
  username: string;
  passwordHash: string;
}

export interface ProductRow {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

export const MOCK_USERS_DB: UserRow[] = []

export const MOCK_PRODUCTS_DB: ProductRow[] = [
  {
    id: "prod_001",
    name: "120mm RGB Case Fan (Molex Connector)",
    price: 350,
    description: "High-airflow cooling fan with customizable RGB lighting.",
    category: "PC Components",
    imageUrl: "https://placehold.co/400x400/1e293b/ffffff?text=RGB+Fan",
    stock: 12,
  },
  {
    id: "prod_002",
    name: "Yonex Astrox Badminton Racket",
    price: 2800,
    description: "Head-heavy balance racket designed for steep smashes.",
    category: "Sports",
    imageUrl: "https://placehold.co/400x400/1e293b/ffffff?text=Badminton+Racket",
    stock: 5,
  }
]

