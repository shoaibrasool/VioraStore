export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
}