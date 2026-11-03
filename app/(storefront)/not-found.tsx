import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { PageContainer } from "@/components/site/section-heading"

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-start gap-4 py-section">
      <p className="font-mono text-meta text-muted-foreground">404</p>
      <h1 className="text-title text-primary">We couldn&apos;t find that page</h1>
      <p className="max-w-prose text-muted-foreground">
        The product or page may have moved, or the link may be incomplete.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/products" className={buttonVariants({ size: "xl" })}>
          Browse products
        </Link>
        <Link
          href="/sourcing"
          className={buttonVariants({ variant: "outline", size: "xl" })}
        >
          Get a Quote
        </Link>
      </div>
    </PageContainer>
  )
}
