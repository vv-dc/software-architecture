export interface Product {
  id: number;
  origin: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  company?: string;
  volume?: number;
  discount?: number;
  degree?: number;
  inStock?: number;
}
