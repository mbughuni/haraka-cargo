/** Shapes used by the editable catalogue files in data/catalog/. */

export type Tint =
  | "blue"
  | "peach"
  | "mint"
  | "lavender"
  | "sand"
  | "rose"
  | "grey"

export type CatalogImage = {
  /** Path under /public, e.g. "/images/products/kanga.jpg". */
  src: string
  /** Describe what the photo shows, for screen readers. */
  alt: string
  /** Photographer, licence and source link. */
  credit?: string
  /** CSS object-position when the photo is cropped, e.g. "50% 30%". */
  focus?: string
  /**
   * true only when the photo shows this exact product. Otherwise the site
   * labels it "Representative photo".
   */
  exact?: boolean
}

export type CategoryInput = {
  id: string
  name: string
  description: string
  tint: Tint
  image: CatalogImage
}

export type ProductInput<CategoryId extends string = string> = {
  /** Used in the web address: /products/<slug>. Lowercase, hyphens, unique. */
  slug: string
  /** Shown on cards and quotations. */
  reference: string
  name: string
  category: CategoryId
  summary: string
  /** Supplier city and state in India. */
  origin: string
  /**
   * Indicative price in Tanzanian shillings (whole shillings, no commas).
   * Leave out `max` for a single price.
   */
  price: { min: number; max?: number; unit: string }
  minimumOrder: string
  leadTime: string
  specifications: { label: string; value: string }[]
  /** Extra words people might search for, e.g. Swahili names. */
  keywords?: string[]
  /** Import or compliance information shown on the product page. */
  note?: string
  /** Leave out to use the category photo. */
  image?: CatalogImage
}
