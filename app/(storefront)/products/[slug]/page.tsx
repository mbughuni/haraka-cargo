import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRightIcon,
  ChevronRightIcon,
  InfoIcon,
  MapPinIcon,
  TimerIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { DemoBadge } from "@/components/site/demo-notice"
import { ProductGrid } from "@/components/site/product-card"
import { ProductMedia } from "@/components/site/product-media"
import {
  PageContainer,
  SectionHeading,
} from "@/components/site/section-heading"
import {
  formatPrice,
  getCategory,
  getProduct,
  products,
} from "@/lib/catalog"
import { cn } from "@/lib/utils"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const product = getProduct((await params).slug)
  if (!product) {
    return { title: "Product not found" }
  }
  return { title: product.name, description: product.summary }
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug)
  if (!product) {
    notFound()
  }

  const category = getCategory(product.category)
  const related = products
    .filter(
      (item) => item.category === product.category && item.slug !== product.slug
    )
    .slice(0, 4)

  return (
    <>
      <PageContainer className="py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Link
                href="/products"
                className="rounded-sm hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Products
              </Link>
              <ChevronRightIcon aria-hidden="true" className="size-3.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <Link
                href={`/products?category=${product.category}`}
                className="rounded-sm hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {category?.name}
              </Link>
              <ChevronRightIcon aria-hidden="true" className="size-3.5" />
            </li>
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>
      </PageContainer>

      <PageContainer className="grid gap-10 pb-section lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <ProductMedia
            product={product}
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="rounded-xl border"
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <DemoBadge />
              <span className="font-mono text-meta text-muted-foreground">
                {product.reference}
              </span>
            </div>
            <h1 className="text-title text-balance text-primary">{product.name}</h1>
            <p className="text-lead text-pretty text-muted-foreground">
              {product.summary}
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border bg-card p-5">
            <div>
              <p className="text-meta text-muted-foreground">
                Indicative price
              </p>
              <p className="mt-1 text-heading tabular-nums">
                {formatPrice(product.price)}
                <span className="block text-sm font-normal text-muted-foreground">
                  per {product.price.unit}
                </span>
              </p>
            </div>
            <ul className="flex flex-col gap-1.5 border-t pt-4 text-meta text-muted-foreground">
              <li>
                In Tanzanian shillings, before freight, import duties and
                delivery.
              </li>
              <li>Your landed cost is confirmed in a written quotation.</li>
              <li>
                Prices change with order size, specification and exchange rates.
              </li>
            </ul>
            <dl className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <dt className="text-meta text-muted-foreground">
                  Minimum order
                </dt>
                <dd className="mt-0.5 font-medium">{product.minimumOrder}</dd>
              </div>
              <div>
                <dt className="text-meta text-muted-foreground">Lead time</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                  <TimerIcon
                    aria-hidden="true"
                    className="size-3.5 text-muted-foreground"
                  />
                  {product.leadTime}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-meta text-muted-foreground">
                  Supplier region
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                  <MapPinIcon
                    aria-hidden="true"
                    className="size-3.5 text-muted-foreground"
                  />
                  {product.origin}, India
                </dd>
              </div>
            </dl>
          </div>

          {product.note ? (
            <div
              role="note"
              className="flex gap-3 rounded-2xl border border-brand-vivid/25 bg-tint-blue/60 p-4 text-sm"
            >
              <InfoIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-ink"
              />
              <p>
                <span className="font-medium">Import requirements: </span>
                <span className="text-muted-foreground">{product.note}</span>
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <Link
              href={`/sourcing?product=${product.slug}`}
              className={cn(buttonVariants({ size: "xl" }), "w-full")}
            >
              Request a quotation
              <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </Link>
            <p className="text-center text-meta text-muted-foreground">
              Free and without obligation. This is not an order.
            </p>
          </div>

          <section
            aria-labelledby="specifications-heading"
            className="border-t pt-6"
          >
            <h2 id="specifications-heading" className="text-subheading">
              Specifications
            </h2>
            <dl className="mt-3 divide-y text-sm">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="grid grid-cols-5 gap-4 py-2.5">
                  <dt className="col-span-2 text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="col-span-3">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </PageContainer>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          className="border-t bg-muted/50 py-section"
        >
          <PageContainer className="flex flex-col gap-8">
            <SectionHeading
              id="related-heading"
              title={`More in ${category?.name}`}
            />
            <ProductGrid products={related} />
          </PageContainer>
        </section>
      ) : null}
    </>
  )
}
