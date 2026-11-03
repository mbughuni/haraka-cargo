/**
 * Catalogue helpers. The categories and products themselves live in
 * data/catalog/categories.ts and data/catalog/products.ts, which are meant
 * to be edited directly.
 */
import { categories as categoryData } from "@/data/catalog/categories"
import { products } from "@/data/catalog/products"
import type { CategoryInput, ProductInput } from "@/lib/catalog-types"

export type { CatalogImage, Tint } from "@/lib/catalog-types"

export type CategoryId = (typeof categoryData)[number]["id"]
export type Category = CategoryInput & { id: CategoryId }
export type Product = ProductInput<CategoryId>

export const categories: readonly Category[] = categoryData
export { products }

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function searchProducts({
  query,
  category,
}: {
  query?: string
  category?: string
}) {
  const terms = tokenize(query ?? "")

  return products.filter((product) => {
    if (category && product.category !== category) {
      return false
    }

    if (terms.length === 0) {
      return true
    }

    // Match terms against the start of words so "tiles" does not match
    // "textiles", while "pump" still matches "pumps".
    const words = tokenize(
      [
        product.name,
        product.summary,
        product.origin,
        getCategory(product.category)?.name ?? "",
        ...(product.keywords ?? []),
      ].join(" ")
    )

    return terms.every((term) => words.some((word) => word.startsWith(term)))
  })
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
}

const tzs = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

/** 2150000 → "TSh 2,150,000" */
export function formatTzs(amount: number) {
  return `TSh ${tzs.format(amount)}`
}

/** "TSh 9,000 – 14,000" or "TSh 9,000" */
export function formatPrice({ min, max }: Product["price"]) {
  return max && max !== min
    ? `${formatTzs(min)} – ${tzs.format(max)}`
    : formatTzs(min)
}
