export type ProductStatus = "in_stock" | "selling_fast" | "drops_friday";

export type SizeCode = "XS" | "S" | "M" | "L" | "XL";

/** A cut-out garment photo. Every image is 760px tall with the hook apex at y=0, centred. */
export interface GarmentImage {
  src: string;
  w: number;
  h: number;
}

export interface Colourway {
  id: string;
  name: string;
  hex: string;
  front: GarmentImage;
  side: GarmentImage;
}

export interface SizeStock {
  size: SizeCode;
  /** 0 = sold out, 1-2 = low stock */
  stock: number;
}

export interface OffTheRailProduct {
  id: string;
  number: number;
  name: string;
  price: number;
  status: ProductStatus;
  description: string;
  colourways: Colourway[];
  sizes: SizeStock[];
}

export interface BagItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  colourName: string;
  colourHex: string;
  size: SizeCode;
  quantity: number;
}
