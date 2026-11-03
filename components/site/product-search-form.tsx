import Form from "next/form"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Pill search field with a round brand action, submitting to /products. */
function ProductSearchForm({
  defaultQuery,
  category,
  size = "default",
  className,
}: {
  defaultQuery?: string
  /** Preserves the active category filter when searching from /products. */
  category?: string
  size?: "default" | "large"
  className?: string
}) {
  const large = size === "large"

  return (
    <Form
      action="/products"
      role="search"
      aria-label="Search products"
      className={cn(
        "flex w-full items-center gap-2 rounded-full border border-transparent bg-muted p-1.5 pl-4 transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/25",
        className
      )}
    >
      <SearchIcon
        aria-hidden="true"
        className={cn(
          "shrink-0 text-muted-foreground",
          large ? "size-5" : "size-4"
        )}
      />
      <label htmlFor={`product-search-${size}`} className="sr-only">
        Search products
      </label>
      <input
        id={`product-search-${size}`}
        name="q"
        type="search"
        defaultValue={defaultQuery}
        placeholder={
          large
            ? "Search kanga, abaya, iPhone, skincare…"
            : "Search products"
        }
        autoComplete="off"
        className={cn(
          "min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/80",
          large ? "h-11" : "h-9 md:text-sm"
        )}
      />
      {category ? (
        <input type="hidden" name="category" value={category} />
      ) : null}
      <button
        type="submit"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground outline-none transition-colors duration-(--duration-fast) hover:bg-brand-hover focus-visible:ring-3 focus-visible:ring-ring/50",
          large ? "size-11" : "size-9"
        )}
      >
        <ArrowRightIcon aria-hidden="true" className="size-5" />
        <span className="sr-only">Search</span>
      </button>
    </Form>
  )
}

export { ProductSearchForm }
