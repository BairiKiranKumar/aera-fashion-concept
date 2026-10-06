import { Product, Collection } from "@/types/commerce";

export const PRODUCTS: Product[] = [
  {
    id: "aera-01",
    slug: "aera-structured-overshirt",
    name: "AERA Structured Overshirt",
    category: "women",
    price: 6490,
    currency: "₹",
    description:
      "A tailored silhouette cut in heavy double-faced cotton canvas. Designed with dropped shoulder lines, concealed horn button placket, and raw-edge cuff accents.",
    details: [
      "100% structured organic cotton canvas",
      "Concealed natural horn button closure",
      "Twin chest welt pockets with clean finish",
      "Dropped shoulder for natural architectural posture",
      "Crafted in small batch tailoring",
    ],
    care: [
      "Dry clean recommended for structural longevity",
      "Gentle cool hand wash with neutral detergent",
      "Reshape while damp, dry flat in shade",
      "Steam iron on medium heat",
    ],
    colors: [
      { name: "Chalk", hex: "#EAE6DF" },
      { name: "Stone", hex: "#B9B1A6" },
      { name: "Charcoal", hex: "#242424" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1776273920142-f30bceff0cf3?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1200&q=85",
      editorial:
        "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1600&q=90",
      detail:
        "https://images.unsplash.com/photo-1771243791734-dfeebf162af0?auto=format&fit=crop&w=1200&q=85",
    },
    featured: true,
    newArrival: true,
    tag: "COLLECTION 01",
  },
  {
    id: "aera-02",
    slug: "aera-relaxed-trouser",
    name: "AERA Relaxed Trouser",
    category: "women",
    price: 5290,
    currency: "₹",
    description:
      "Engineered for fluid everyday movement. Wide-leg profile with subtle front single pleats, internal drawstring adjustment, and a clean hook-and-bar closure.",
    details: [
      "Lightweight virgin wool and lyocell blend",
      "Deep side slant pockets and rear welt pockets",
      "Continuous waistband with blind hem stitch",
      "Relaxed cut with gentle drape through ankle",
    ],
    care: [
      "Dry clean only",
      "Do not tumble dry",
      "Store on contoured trouser hanger",
    ],
    colors: [
      { name: "Stone", hex: "#B9B1A6" },
      { name: "Charcoal", hex: "#242424" },
      { name: "Off White", hex: "#F5F2EC" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1741605037162-b1f475a4a4d3?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1613728455120-d00493b5e77e?auto=format&fit=crop&w=1200&q=85",
      editorial:
        "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1600&q=90",
      detail:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
    },
    featured: true,
    newArrival: true,
    tag: "SIGNATURE",
  },
  {
    id: "aera-03",
    slug: "aera-ribbed-tank",
    name: "AERA Ribbed Tank",
    category: "essentials",
    price: 2990,
    currency: "₹",
    description:
      "A tactile foundation piece. Knitted in dense micro-rib Supima cotton with a softly square neckline and bound edges that retain form after repeated wear.",
    details: [
      "95% Supima cotton, 5% elastane micro-rib",
      "Reinforced neckline and armhole binding",
      "Clean straight hem sitting just below waistline",
      "Ultra-soft brushed interior feel",
    ],
    care: [
      "Machine wash cool on delicate cycle",
      "Wash inside out with like colors",
      "Dry flat away from direct heat",
    ],
    colors: [
      { name: "Warm White", hex: "#F5F2EC" },
      { name: "Muted Stone", hex: "#B9B1A6" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1762395271662-2a5a077f9662?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
      editorial:
        "https://images.unsplash.com/photo-1771243791734-dfeebf162af0?auto=format&fit=crop&w=1600&q=90",
      detail:
        "https://images.unsplash.com/photo-1776273920142-f30bceff0cf3?auto=format&fit=crop&w=1200&q=85",
    },
    featured: true,
    newArrival: false,
    tag: "ESSENTIAL",
  },
  {
    id: "aera-04",
    slug: "aera-essential-coat",
    name: "AERA Essential Coat",
    category: "men",
    price: 9990,
    currency: "₹",
    description:
      "A minimal single-breasted overcoat tailored in double-faced felted wool. Features a sharp peak lapel, hidden magnetic fly, and deep side welt pockets.",
    details: [
      "80% recycled wool, 20% cashmere blend",
      "Unlined interior with contrast hand-bound seams",
      "Single back vent for uninhibited stride",
      "Subtle architectural collar stand",
    ],
    care: [
      "Specialist dry clean only",
      "Brush regularly with soft garment brush",
      "Store in breathable cotton garment bag",
    ],
    colors: [
      { name: "Slate Grey", hex: "#4A4D52" },
      { name: "Stone", hex: "#B9B1A6" },
      { name: "Black", hex: "#0A0A0A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1771243791734-dfeebf162af0?auto=format&fit=crop&w=1200&q=85",
      editorial:
        "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1600&q=90",
      detail:
        "https://images.unsplash.com/photo-1613728455120-d00493b5e77e?auto=format&fit=crop&w=1200&q=85",
    },
    featured: true,
    newArrival: true,
    tag: "OUTERWEAR",
  },
  {
    id: "aera-05",
    slug: "aera-sculpted-poplin-shirt",
    name: "AERA Sculpted Poplin Shirt",
    category: "women",
    price: 4890,
    currency: "₹",
    description:
      "Crisp organic cotton poplin crafted with sculpted sleeve darting and an elongated point collar. Understated volume balanced by sharp tailoring.",
    details: [
      "100% GOTS certified organic cotton poplin",
      "Mother-of-pearl buttons",
      "Curved hemline with reinforced gussets",
      "Barrel cuffs with dual adjustable closure",
    ],
    care: [
      "Machine wash 30°C delicate",
      "Line dry in shade",
      "Warm steam iron while slightly damp",
    ],
    colors: [
      { name: "Chalk White", hex: "#F5F2EC" },
      { name: "Charcoal", hex: "#242424" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1741605037162-b1f475a4a4d3?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1776273920142-f30bceff0cf3?auto=format&fit=crop&w=1200&q=85",
    },
    featured: false,
    newArrival: true,
    tag: "NEW",
  },
  {
    id: "aera-06",
    slug: "aera-drape-wool-cardigan",
    name: "AERA Drape Wool Cardigan",
    category: "essentials",
    price: 7290,
    currency: "₹",
    description:
      "A fluid knit layer in extrafine merino wool. Designed with an open front silhouette, soft drop shoulder, and ribbed cuffs.",
    details: [
      "100% extrafine merino wool 14-gauge knit",
      "Seamless tubular edge finishing",
      "Slanted front pockets set into side seams",
    ],
    care: [
      "Hand wash cold with wool detergent",
      "Do not wring or twist",
      "Dry flat on clean towel",
    ],
    colors: [
      { name: "Stone", hex: "#B9B1A6" },
      { name: "Charcoal", hex: "#242424" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: {
      primary:
        "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1200&q=85",
      secondary:
        "https://images.unsplash.com/photo-1765114459508-2666016760af?auto=format&fit=crop&w=1200&q=85",
    },
    featured: false,
    newArrival: true,
    tag: "KNITWEAR",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-01",
    slug: "collection-01-ss26",
    title: "Collection 01",
    subtitle: "SS26 Movement Studies",
    description:
      "A study in proportion, texture, and everyday movement. Refined silhouettes calibrated for natural posture.",
    coverImage:
      "https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "col-women",
    slug: "women",
    title: "Women",
    subtitle: "Refined essentials for everyday movement",
    description:
      "Structured overshirts, fluid trousers, and sculpted tailoring cut for ease and quiet confidence.",
    coverImage:
      "https://images.unsplash.com/photo-1776273920158-510b171e936f?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "col-men",
    slug: "men",
    title: "Men",
    subtitle: "Modern silhouettes and tactile tailoring",
    description:
      "Relaxed outerwear, clean drape trousers, and balanced foundational layers.",
    coverImage:
      "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "col-essentials",
    slug: "essentials",
    title: "Essentials",
    subtitle: "Permanent wardrobe foundations",
    description:
      "Tactile micro-rib knits, organic poplin, and enduring foundations designed for continuous wear.",
    coverImage:
      "https://images.unsplash.com/photo-1759229874914-c1ffdb3ebd0c?auto=format&fit=crop&w=1600&q=90",
  },
];
