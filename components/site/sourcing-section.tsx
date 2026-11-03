import Image from "next/image"
import { CheckIcon, SparklesIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Eyebrow, PageContainer } from "@/components/site/section-heading"
import { SourcingRequestForm } from "@/components/site/sourcing-request-form"
import { images } from "@/lib/images"

const whatToInclude = [
  "What the product is, with model, size, material or standard",
  "How many you need, and your target price if you have one",
  "The town in Tanzania it should reach, and when",
  "A link to a similar product. Photo uploads arrive with online submission",
]

const requestIs = [
  "A description of what you want us to find",
  "Free, with no obligation to buy",
  "The start of a written quotation",
]

const requestIsNot = [
  "An order or a purchase",
  "A payment or deposit",
  "A reservation of supplier stock",
]

function RequestVersusOrder() {
  return (
    <div className="grid gap-6 rounded-3xl bg-card p-5 sm:grid-cols-2">
      <div>
        <h3 className="text-label">A sourcing request is</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {requestIs.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <CheckIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-success"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-label">A sourcing request is not</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {requestIsNot.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <XIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground/70"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** States plainly that the AI assistant is not yet operational. */
function AssistantStatusNote() {
  return (
    <div className="flex gap-3 rounded-2xl border border-dashed border-primary/25 bg-card/70 p-4">
      <SparklesIcon
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-primary"
      />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-label">AI sourcing assistant</p>
          <Badge variant="muted">In development</Badge>
        </div>
        <p className="text-meta text-muted-foreground">
          An assistant that turns your description into a clear supplier brief
          is being built. It is not active yet. Saving requests, AI processing
          and WhatsApp updates will be connected in a later release, and a
          person will review every request before any quotation is issued.
        </p>
      </div>
    </div>
  )
}

function SourcingSection({
  initialProduct,
  initialCategory,
}: {
  initialProduct?: string
  initialCategory?: string
}) {
  const photo = images.supplierMeeting

  return (
    <section
      id="sourcing-request"
      aria-labelledby="sourcing-heading"
      className="border-y bg-tint-blue/60 py-section"
    >
      <PageContainer className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>Sourcing request</Eyebrow>
          <h2
            id="sourcing-heading"
            className="text-title text-balance text-primary"
          >
            Can&apos;t find what you need?
          </h2>
          <p className="text-lead text-pretty text-muted-foreground">
            Most of what we source is not listed on the site. Describe the item
            and we look for suitable suppliers, then send a written quotation
            for the full landed cost. You decide whether to go ahead.
          </p>

          <div className="relative aspect-editorial overflow-hidden rounded-3xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.focus }}
            />
          </div>

          <div>
            <h3 className="text-label text-primary">
              What to include in your request
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {whatToInclude.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand-green-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <AssistantStatusNote />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="rounded-3xl bg-card p-5 shadow-raised sm:p-8">
            <SourcingRequestForm
              idPrefix="home-sourcing"
              initialProduct={initialProduct}
              initialCategory={initialCategory}
            />
          </div>
          <RequestVersusOrder />
        </div>
      </PageContainer>
    </section>
  )
}

export { SourcingSection, RequestVersusOrder, AssistantStatusNote }
