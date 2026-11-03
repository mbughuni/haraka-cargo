import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FileClockIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Eyebrow, PageContainer } from "@/components/site/section-heading"
import { cn } from "@/lib/utils"

/**
 * Policy documents have not been written or legally reviewed yet. Each page
 * says so plainly instead of linking to a missing page or placeholder text.
 * Replace `summary` with the published policy when it is approved.
 */
const policies = {
  sourcing: {
    title: "Sourcing policy",
    summary:
      "How sourcing requests are handled, how suppliers are checked and what a quotation includes.",
  },
  shipping: {
    title: "Shipping policy",
    summary:
      "Consolidation cut-offs, transit estimates, customs clearance and delivery responsibilities.",
  },
  privacy: {
    title: "Privacy",
    summary:
      "What personal information Haraka Cargo collects, why, and how you can access or delete it.",
  },
  terms: {
    title: "Terms",
    summary:
      "The terms that apply to quotations, orders, payments and use of this website.",
  },
} as const

type PolicySlug = keyof typeof policies
type Params = Promise<{ slug: string }>

function getPolicy(slug: string) {
  return slug in policies ? policies[slug as PolicySlug] : undefined
}

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const policy = getPolicy((await params).slug)
  return { title: policy?.title ?? "Policy not found" }
}

export default async function PolicyPage({ params }: { params: Params }) {
  const policy = getPolicy((await params).slug)
  if (!policy) {
    notFound()
  }

  return (
    <PageContainer className="flex flex-col gap-8 py-section">
      <div className="flex max-w-prose flex-col gap-4">
        <Eyebrow>Policies</Eyebrow>
        <h1 className="text-title text-primary">{policy.title}</h1>
        <p className="text-lead text-muted-foreground">{policy.summary}</p>
      </div>
      <div className="flex max-w-2xl gap-4 rounded-lg border border-dashed bg-card p-5">
        <FileClockIcon
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-primary"
        />
        <div className="flex flex-col gap-1.5">
          <p className="text-label">This policy is being prepared</p>
          <p className="text-sm text-muted-foreground">
            It will be published here before Haraka Cargo accepts orders. Until
            then, nothing is bought or charged through this website, and every
            quotation states its own terms in writing.
          </p>
        </div>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "xl" }),
          "self-start"
        )}
      >
        Back to the homepage
      </Link>
    </PageContainer>
  )
}
