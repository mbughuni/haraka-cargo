import Link from "next/link"
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react"

import { ProductMedia } from "@/components/site/product-media"
import { getCategory, type Product } from "@/lib/catalog"
import { tintBackground } from "@/lib/tints"
import { cn } from "@/lib/utils"

const tzs = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })

/** "TSh 2,150,000" with a smaller currency label, as in the reference design. */
function Price({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("tabular-nums", className)}>
      <span className="mr-1 text-[0.6em] font-medium">TSh</span>
      {tzs.format(value)}
    </span>
  )
}

function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const category = getCategory(product.category)
  const tint = category ? tintBackground[category.tint] : "bg-muted"

  return (
    <article
      className={cn(
        "group/product relative flex flex-col gap-4 rounded-3xl p-3 transition-shadow duration-(--duration-base) ease-standard hover:shadow-raised has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50",
        tint,
        className
      )}
    >
      <div className="relative">
        <ProductMedia
          product={product}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="rounded-2xl"
        />
        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
          <span className="rounded-full bg-card/95 px-2.5 py-1 text-meta font-medium text-foreground shadow-card">
            MOQ: {product.minimumOrder}
          </span>
          <span className="rounded-full bg-card/95 px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground shadow-card">
            {product.reference}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2">
        <p className="text-meta text-muted-foreground">{category?.name}</p>
        <h3 className="text-[1.0625rem] leading-snug font-medium text-balance">
          <Link
            href={`/products/${product.slug}`}
            className="outline-none after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.summary}
        </p>
        <p className="flex items-center gap-1.5 text-meta text-muted-foreground">
          <MapPinIcon aria-hidden="true" className="size-3.5 shrink-0" />
          <span className="truncate">{product.origin}, India</span>
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 px-2 pb-1">
        <div className="min-w-0">
          <p className="text-meta text-muted-foreground">
            Indicative price, per {product.price.unit}
          </p>
          <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 text-[1.375rem] leading-tight font-semibold">
            <Price value={product.price.min} />
            {product.price.max && product.price.max !== product.price.min ? (
              <span className="text-sm font-normal text-muted-foreground">
                to {tzs.format(product.price.max)}
              </span>
            ) : null}
          </p>
        </div>
        <Link
          href={`/sourcing?product=${product.slug}`}
          className="relative z-10 inline-flex h-10 shrink-0 items-center gap-1 rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground outline-none transition-colors duration-(--duration-fast) hover:bg-brand-hover focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Quote
          <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          <span className="sr-only"> request for {product.name}</span>
        </Link>
      </div>
    </article>
  )
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {products.map((product) => (
        <li key={product.slug} className="flex">
          <ProductCard product={product} className="w-full" />
        </li>
      ))}
    </ul>
  )
}

export { ProductCard, ProductGrid, Price }
