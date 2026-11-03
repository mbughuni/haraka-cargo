"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon, SearchIcon, SearchXIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductGrid } from "@/components/site/product-card"
import { categories, searchProducts, type CategoryId } from "@/lib/catalog"
import { cn } from "@/lib/utils"

const PREVIEW_LIMIT = 6

function catalogueHref(query: string, category: CategoryId | null) {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  if (category) params.set("category", category)
  const search = params.toString()
  return search ? `/products?${search}` : "/products"
}

/**
 * Homepage catalogue preview. Filters the demonstration catalogue in the
 * browser. It does not query a product database.
 */
function ProductShowcase() {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<CategoryId | null>(null)
  const deferredQuery = React.useDeferredValue(query.trim())

  const results = React.useMemo(
    () =>
      searchProducts({
        query: deferredQuery,
        category: category ?? undefined,
      }),
    [deferredQuery, category]
  )
  // With no search or filter, preview one product from each category so the
  // homepage shows the full range rather than the first few listings.
  const filtered = Boolean(deferredQuery || category)
  const visible = filtered
    ? results.slice(0, PREVIEW_LIMIT)
    : categories
        .map((item) => results.find((product) => product.category === item.id))
        .filter((product) => product !== undefined)
        .slice(0, PREVIEW_LIMIT)

  const chipClass =
    "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm whitespace-nowrap outline-none transition-colors duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/50"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-card p-4 shadow-card sm:p-5">
        <div className="relative">
          <label htmlFor="showcase-search" className="sr-only">
            Search demonstration products
          </label>
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="showcase-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search kanga, abaya, iPhone, CeraVe…"
            autoComplete="off"
            className="h-12 rounded-full border-transparent bg-muted pr-11 pl-11 text-base md:text-base"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <XIcon aria-hidden="true" className="size-4" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5 md:flex-wrap md:overflow-visible"
        >
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
            className={cn(
              chipClass,
              category === null
                ? "border-brand bg-brand text-brand-foreground"
                : "border-transparent bg-muted hover:bg-border"
            )}
          >
            All
          </button>
          {categories.map((item) => {
            const active = category === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(active ? null : item.id)}
                className={cn(
                  chipClass,
                  active
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-transparent bg-muted hover:bg-border"
                )}
              >
                {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {results.length === 0
            ? "No demonstration products match"
            : results.length > visible.length
              ? `Showing ${visible.length} of ${results.length} demonstration products`
              : `${results.length} demonstration ${results.length === 1 ? "product" : "products"}`}
          {deferredQuery ? (
            <>
              {" "}
              for{" "}
              <span className="font-medium text-foreground">
                “{deferredQuery}”
              </span>
            </>
          ) : null}
        </p>
        <Link
          href={catalogueHref(deferredQuery, category)}
          className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {filtered ? "See these results on the products page" : "View all products"}
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-card px-6 py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchXIcon aria-hidden="true" className="size-6" />
          </span>
          <div className="flex max-w-md flex-col gap-1.5">
            <h3 className="text-subheading text-primary">
              Can&apos;t find this product?
            </h3>
            <p className="text-sm text-muted-foreground">
              We can still look for it. Describe what you need and we&apos;ll
              come back with a written quotation.
            </p>
          </div>
          <Link
            href={
              deferredQuery
                ? `/sourcing?q=${encodeURIComponent(deferredQuery)}${category ? `&category=${category}` : ""}`
                : `/sourcing${category ? `?category=${category}` : ""}`
            }
            className={buttonVariants({ variant: "brand", size: "xl" })}
          >
            Request this product
          </Link>
        </div>
      )}
    </div>
  )
}

export { ProductShowcase }
