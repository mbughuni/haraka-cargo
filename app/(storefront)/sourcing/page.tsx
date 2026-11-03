import type { Metadata } from "next"

import { Eyebrow, PageContainer } from "@/components/site/section-heading"
import {
  AssistantStatusNote,
  RequestVersusOrder,
} from "@/components/site/sourcing-section"
import { SourcingRequestForm } from "@/components/site/sourcing-request-form"
import { getCategory, getProduct } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Describe the product you need from India and receive a written quotation for the full landed cost in Tanzania.",
}

const nextSteps = [
  "A sourcing agent reviews your request and asks about anything unclear.",
  "We contact suitable suppliers in India and confirm price, specification and lead time.",
  "You receive a written quotation for the landed cost to your town.",
  "You decide. Nothing is ordered unless you accept the quotation.",
]

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function SourcingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const product = getProduct(single(params.product) ?? "")
  const query = (single(params.q) ?? "").trim().slice(0, 200)
  const category =
    product?.category ?? getCategory(single(params.category) ?? "")?.id

  const initialProduct = product
    ? `${product.name} (product ref. ${product.reference}). `
    : query

  return (
    <>
      <section
        aria-labelledby="sourcing-page-heading"
        className="border-b bg-card"
      >
        <PageContainer className="flex flex-col gap-4 py-10 md:py-14">
          <Eyebrow>Sourcing request</Eyebrow>
          <h1
            id="sourcing-page-heading"
            className="max-w-3xl text-title text-balance text-primary"
          >
            {product
              ? "Request a quotation"
              : "Tell us what you need from India"}
          </h1>
          <p className="max-w-prose text-lead text-pretty text-muted-foreground">
            {product
              ? `We've started your request with ${product.name}. Add your quantity and delivery town and we'll prepare a written quotation.`
              : "Describe the product, quantity and delivery town. We find suppliers and return a written quotation for the full landed cost."}
          </p>
        </PageContainer>
      </section>

      <PageContainer className="grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
        <div className="rounded-xl border bg-card p-5 shadow-card sm:p-8 lg:col-span-8">
          <SourcingRequestForm
            key={`${initialProduct}|${category ?? ""}`}
            idPrefix="sourcing-page"
            initialProduct={initialProduct}
            initialCategory={category}
          />
        </div>

        <aside
          aria-label="About sourcing requests"
          className="flex flex-col gap-6 lg:col-span-4"
        >
          <RequestVersusOrder />

          <section
            aria-labelledby="next-steps-heading"
            className="rounded-lg border bg-card p-5"
          >
            <h2 id="next-steps-heading" className="text-label">
              What happens after you send a request
            </h2>
            <ol className="mt-4 flex flex-col gap-3">
              {nextSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.6875rem] text-primary">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t pt-4 text-meta text-muted-foreground">
              Online submission is not open yet. For now, you can prepare your
              request and copy the summary.
            </p>
          </section>

          <AssistantStatusNote />
        </aside>
      </PageContainer>
    </>
  )
}
