/**
 * PRODUCT CATEGORIES — edit this file to change the categories on the site.
 *
 * The order here is the order shown on the homepage and the Products page.
 * The first category gets the large tile on the homepage.
 *
 * To add a category:
 *   1. Copy one of the blocks below and give it a new, unique `id`
 *      (lowercase, words joined with hyphens, e.g. "baby-products").
 *   2. Put a photo in /public/images and set `image.src` to its path
 *      (e.g. "/images/baby-products.jpg"). Use photos you are licensed to use
 *      and record where they came from in `image.credit`.
 *   3. Pick a background `tint`: blue, peach, mint, lavender, sand, rose, grey.
 *   4. Use the same `id` as `category` on the products in products.ts.
 *
 * To remove a category, delete its block and any products that use it.
 */
import type { CategoryInput } from "@/lib/catalog-types"

export const categories = [
  {
    id: "textiles",
    name: "Textiles & Fabrics",
    description: "Kanga, African prints and cotton fabric",
    tint: "rose",
    image: {
      src: "/images/kanga-prints.jpg",
      alt: "Brightly patterned African wax-print fabric worn as a wrap and skirt",
      credit: "Barney Goodman, Unsplash License (unsplash.com/photos/jjWXuu3Ewhg)",
    },
  },
  {
    id: "abaya",
    name: "Abayas",
    description: "Everyday and occasion abayas",
    tint: "lavender",
    image: {
      src: "/images/abaya-portrait.jpg",
      alt: "A woman wearing a black abaya and hijab against a plain wall",
      credit: "Good Faces, Unsplash License (unsplash.com/photos/2eC_-0yRrGU)",
    },
  },
  {
    id: "cosmetics",
    name: "Cosmetics & Skincare",
    description: "CeraVe, Minimalist, Fixderma and more",
    tint: "peach",
    image: {
      src: "/images/skincare-serum.jpg",
      alt: "An amber glass serum bottle with a dropper on a stone block",
      credit: "Avtar Singh, Unsplash License (unsplash.com/photos/MkuwnDkT1s0)",
    },
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Smartphones, scanners and office equipment",
    tint: "blue",
    image: {
      src: "/images/smartphones.jpg",
      alt: "Two smartphones with multiple rear cameras lying on a wooden table",
      credit: "Amanz, Unsplash License (unsplash.com/photos/MYFySiWABQE)",
    },
  },
  {
    id: "health",
    name: "Health & Wellness",
    description: "Non-prescription supplements and nutrition",
    tint: "mint",
    image: {
      src: "/images/protein-powder.jpg",
      alt: "A tub of protein powder beside a scoop of powder",
      credit: "Alex Saks, Unsplash License (unsplash.com/photos/4CzpHxVzTFA)",
    },
  },
  {
    id: "auto-parts",
    name: "Motorcycle & Auto Parts",
    description: "Spares for common two- and three-wheelers",
    tint: "grey",
    image: {
      src: "/images/engine-parts.jpg",
      alt: "Close-up of engine pulleys, belts and hoses",
      credit: "Chad Kirchoff, Unsplash License (unsplash.com/photos/xe-e69j6-Ds)",
    },
  },
  {
    id: "building",
    name: "Building Materials",
    description: "Tiles, sanitary ware, fittings",
    tint: "sand",
    image: {
      src: "/images/construction-materials.jpg",
      alt: "Aerial view of a building site with pallets of blocks stacked on the ground",
      credit: "Iain, Unsplash License (unsplash.com/photos/yeaLnLojm80)",
    },
  },
  {
    id: "packaging",
    name: "Packaging",
    description: "Woven sacks, cartons, films",
    tint: "lavender",
    image: {
      src: "/images/packing-cartons.jpg",
      alt: "Cardboard cartons, film rolls and kraft pouches on pallets",
      credit:
        "Guilherme Mendes, Unsplash License (unsplash.com/photos/RVP3wAw9gJY). Appears to be a rendered image.",
    },
  },
] as const satisfies readonly CategoryInput[]
