import Database from 'better-sqlite3'
import type { Database as DBtype } from 'better-sqlite3'

const db: DBtype = new Database("local.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, 
    username TEXT UNIQUE,
    passwordHash TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    price INTEGER, 
    description TEXT,
    category TEXT,
    imageUrl TEXT,
    stock INTEGER
  );
`)

const checkProducts = db.prepare("SELECT COUNT(*) as count FROM products")
const row = checkProducts.get() as { count: number };

if (row.count === 0) {
  console.log("Empty Database. Sending seeding initial products...")
  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, price, description, category, imageUrl, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  insertProduct.run(
    "prod_001",
    "120mm RGB Case Fan (Molex Connector)",
    350,
    "High-airflow cooling fan with customizable RGB lighting.",
    "PC Components",
    "https://placehold.co/400x400/1e293b/ffffff?text=RGB+Fan",
    12
  );

  insertProduct.run(
    "prod_002",
    "Yonex Astrox Badminton Racket",
    2800,
    "Head-heavy balance racket designed for steep smashes.",
    "Sports",
    "https://placehold.co/400x400/1e293b/ffffff?text=Badminton+Racket",
    5
  );
}

export default db;
