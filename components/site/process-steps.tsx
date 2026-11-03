import {
  BadgeCheckIcon,
  FileTextIcon,
  HandshakeIcon,
  PackageCheckIcon,
  SearchIcon,
  ShipIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type Step = {
  title: string
  icon: LucideIcon
  description: string
  /** The record state a customer sees at the end of this step. */
  state: string
  commitment?: boolean
}

const steps: Step[] = [
  {
    title: "Browse or describe",
    icon: SearchIcon,
    description:
      "Choose a listed product or submit a request for an unlisted item with specifications, quantity and delivery town.",
    state: "Sourcing inquiry",
  },
  {
    title: "Supplier and specification check",
    icon: BadgeCheckIcon,
    description:
      "We identify suitable suppliers, check their registration and export history, and confirm specification and lead time.",
    state: "Inquiry under review",
  },
  {
    title: "Written quotation",
    icon: FileTextIcon,
    description:
      "You receive a quotation that lists product cost, freight, estimated duties and delivery separately, with its assumptions and validity date.",
    state: "Quotation issued",
  },
  {
    title: "Acceptance and payment",
    icon: HandshakeIcon,
    description:
      "Accepting the quotation confirms your order. Payment is then made as the quotation sets out, and we confirm receipt in writing.",
    state: "Order confirmed · Payment confirmed",
    commitment: true,
  },
  {
    title: "Purchasing and shipment",
    icon: ShipIcon,
    description:
      "We place the purchase, consolidate goods at origin and book sea or air freight. Your consignment gets a shipment reference.",
    state: "In transit",
  },
  {
    title: "Updates and delivery",
    icon: PackageCheckIcon,
    description:
      "You receive shipment updates against your reference, and we coordinate clearance at Dar es Salaam and handover or onward delivery.",
    state: "Delivered",
  },
]

const stateGlossary = [
  {
    term: "Sourcing inquiry",
    definition: "A free request for us to find a product. Not an order.",
  },
  {
    term: "Quotation",
    definition: "Our written offer with all charges and assumptions stated.",
  },
  {
    term: "Confirmed order",
    definition: "Created only when you accept a quotation.",
  },
  {
    term: "Payment confirmation",
    definition: "Our written receipt of the payment the quotation requires.",
  },
  {
    term: "Shipment status",
    definition: "Updates against your shipment reference once goods move.",
  },
]

function ProcessSteps() {
  return (
    <div className="flex flex-col gap-10">
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={cn(
              "relative flex flex-col gap-4 rounded-3xl border bg-card p-5 sm:p-6",
              step.commitment && "border-brand-vivid/50 bg-tint-blue/45"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand font-mono text-sm font-medium text-primary-foreground">
                {index + 1}
              </span>
              <step.icon
                aria-hidden="true"
                className="size-5 text-brand-ink"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-subheading text-primary">{step.title}</h3>
              <p className="text-sm text-pretty text-muted-foreground">
                {step.description}
              </p>
            </div>
            <p className="mt-auto flex flex-wrap items-center gap-2 border-t pt-3 text-meta">
              <span className="text-muted-foreground">Status:</span>
              <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                {step.state}
              </span>
              {step.commitment ? (
                <span className="rounded-full bg-tint-blue px-2 py-0.5 font-medium text-brand-ink">
                  Your commitment point
                </span>
              ) : null}
            </p>
          </li>
        ))}
      </ol>

      <div className="rounded-3xl bg-muted p-5 sm:p-6">
        <h3 className="text-label text-primary">
          What each status means
        </h3>
        <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
          {stateGlossary.map((item) => (
            <div key={item.term} className="flex flex-col gap-1">
              <dt className="text-sm font-medium">{item.term}</dt>
              <dd className="text-meta text-muted-foreground">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export { ProcessSteps }
