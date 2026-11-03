import {
  BadgeCheckIcon,
  CameraIcon,
  FileSignatureIcon,
  HeadsetIcon,
  ScanBarcodeIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react"

import { PageContainer } from "@/components/site/section-heading"

type Commitment = {
  title: string
  description: string
  icon: LucideIcon
}

const commitments: Commitment[] = [
  {
    title: "Transparent quotations",
    description:
      "Product cost, freight, estimated duties and delivery are listed separately, with assumptions and a validity date, before you pay anything.",
    icon: FileSignatureIcon,
  },
  {
    title: "Supplier verification",
    description:
      "Suppliers are checked for business registration and export history before we place an order with them.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Inspection before dispatch",
    description:
      "Goods are checked against your order and photographed before they leave the supplier.",
    icon: CameraIcon,
  },
  {
    title: "Coordinated shipment",
    description:
      "Each consignment carries a Haraka shipment reference from collection at origin to handover in Tanzania.",
    icon: ScanBarcodeIcon,
  },
  {
    title: "Clear responsibilities",
    description:
      "Your quotation states what we handle and what remains with you, including customs documents and onward delivery.",
    icon: ShieldCheckIcon,
  },
  {
    title: "A person to talk to",
    description:
      "Requests and quotations are handled by our team, who reply by phone or WhatsApp once contact channels open.",
    icon: HeadsetIcon,
  },
]

/** The page's single high-contrast navy band. */
function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="bg-surface-inverse py-section text-surface-inverse-foreground"
    >
      <PageContainer className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <p className="flex items-center gap-2 text-eyebrow text-brand-on-dark uppercase">
            <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-brand-green" />
            How we work
          </p>
          <h2 id="trust-heading" className="text-heading text-balance">
            Buying across borders, without the guesswork
          </h2>
          <p className="text-pretty text-surface-inverse-muted">
            We do not publish testimonials or volumes we cannot yet support.
            Instead, these are the procedures every order follows.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {commitments.map((commitment) => (
            <li key={commitment.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-surface-inverse-foreground/15 text-brand-on-dark">
                <commitment.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-label">{commitment.title}</h3>
                <p className="text-sm text-pretty text-surface-inverse-muted">
                  {commitment.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  )
}

export { TrustSection }
