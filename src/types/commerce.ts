export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "women" | "men" | "essentials";
  price: number;
  currency: string;
  description: string;
  details: string[];
  care: string[];
  colors: ProductColor[];
  sizes: string[];
  images: {
    primary: string;
    secondary: string;
    editorial?: string;
    detail?: string;
  };
  featured?: boolean;
  newArrival?: boolean;
  tag?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
}
