import Image from "next/image"

import { PageContainer, SectionHeading } from "@/components/site/section-heading"
import { images, type ImageKey } from "@/lib/images"
import { cn } from "@/lib/utils"

type Stage = {
  image: ImageKey
  label: string
  title: string
  description: string
  className: string
  sizes: string
}

const stages: Stage[] = [
  {
    image: "textileManufacturing",
    label: "At the supplier",
    title: "Production checked against your order",
    description:
      "We confirm specifications, quantities and packing with the manufacturer before goods are released for dispatch.",
    className: "lg:col-span-7 lg:row-span-2",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    image: "supplierInspection",
    label: "Supplier checks",
    title: "Specifications confirmed in writing",
    description:
      "Suppliers are checked for registration and export history before we place an order.",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    image: "warehouseConsolidation",
    label: "Consolidation",
    title: "Smaller orders share container space",
    description:
      "Goods from several suppliers are gathered, packed and documented at origin.",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
]

function OperationsGallery() {
  return (
    <section aria-labelledby="operations-heading" className="py-section">
      <PageContainer className="flex flex-col gap-10">
        <SectionHeading
          id="operations-heading"
          eyebrow="What we coordinate"
          title="From the supplier floor to Dar es Salaam"
          description="One team manages each step between your quotation and delivery, so you are not chasing suppliers, forwarders and clearing agents separately."
        />
        <ul className="grid gap-4 lg:auto-rows-[17rem] lg:grid-cols-12">
          {stages.map((stage, index) => {
            const image = images[stage.image]
            return (
              <li key={stage.image} className={cn("flex", stage.className)}>
                <figure className="relative flex w-full flex-col overflow-hidden rounded-3xl bg-card max-lg:min-h-[19rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    placeholder="blur"
                    sizes={stage.sizes}
                    className="object-cover"
                    style={{ objectPosition: image.focus }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-surface-inverse/90 via-surface-inverse/30 to-transparent"
                  />
                  <figcaption className="relative mt-auto flex flex-col gap-1.5 p-5 sm:p-6">
                    <span className="flex items-center gap-2 text-eyebrow text-brand-on-dark uppercase">
                      <span className="font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {stage.label}
                    </span>
                    <span
                      className={cn(
                        "font-semibold text-balance text-white",
                        index === 0 ? "text-heading" : "text-subheading"
                      )}
                    >
                      {stage.title}
                    </span>
                    <span className="max-w-md text-sm text-pretty text-white/85">
                      {stage.description}
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
        <p className="text-meta text-muted-foreground">
          Photography is illustrative and does not show Haraka Cargo suppliers
          or shipments.
        </p>
      </PageContainer>
    </section>
  )
}

export { OperationsGallery }
