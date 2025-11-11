export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
